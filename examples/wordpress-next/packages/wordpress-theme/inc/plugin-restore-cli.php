<?php

class PluginListCommand
{
  /**
   * Output existing plugins, versions, and activation status for restoring later.
   *
   * ## OPTIONS
   *
   * [<output-file>]
   * : Path to a file to write output (defaults to STDOUT)
   *
   * ## EXAMPLES
   *
   *     wp plugin-list backup ./plugins.json
   *
   *     wp plugin-list backup > ./plugins.json
   */
  public function backup($args)
  {
    $outputFile = isset($args[0]) ? fopen($args[0], 'w') : STDOUT;

    $getJSONText = function ($plugins) {
      return json_encode($plugins, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    };

    $reduceSpaces = function ($jsonText) {
      return preg_replace('/    /', '  ', $jsonText);
    };

    $addTrailingNewLine = function ($jsonText) {
      return "$jsonText\n";
    };

    $outputText = self::pipe(
      [$getJSONText, $reduceSpaces, $addTrailingNewLine],
      self::getCurrentPluginList()
    );

    fwrite($outputFile, $outputText);

    fclose($outputFile);
  }

  /**
   * Installs, deletes, upgrade, and downgrade dependencies based on a JSON config file.
   *
   * ## OPTIONS
   *
   * <plugin-json-file>
   * : Path to a list of plugins
   *
   * [--dry-run]
   * : Create a report of changes to make, but don't save the changes to the database
   *
   * ## EXAMPLES
   *
   *     wp plugin-list restore ./plugins.json
   */
  public function restore($args, $args_assoc)
  {
    $pluginFile = $args[0];
    $wantedPlugins = json_decode(file_get_contents($pluginFile), true);

    $currentPlugins = self::getCurrentPluginList();

    // Create a list of all current and wanted plugins to test for changes
    $pluginList = array_unique(
      array_column(array_merge($currentPlugins, $wantedPlugins), 'name')
    );

    // Create a list of actions to perform on the plugins
    $actions = self::generateActionsFromPlugins(
      $pluginList,
      $currentPlugins,
      $wantedPlugins
    );

    // If there are no actions to take, log and exit
    if (empty($actions)) {
      WP_CLI::success('Already up-to-date.');
      return;
    }

    $actionOrder = ['delete', 'install', 'deactivate', 'activate', 'update'];

    foreach ($actionOrder as $actionName) {
      if (isset($actions[$actionName])) {
        self::runActionOnPlugins(
          $actionName,
          $actions[$actionName],
          $args_assoc
        );
      }
    }
  }

  private static function findPluginWithName($array, $pluginName)
  {
    return array_reduce(
      $array,
      function ($match, $plugin) use ($pluginName) {
        if ($match === null && $plugin['name'] === $pluginName) {
          return $plugin;
        }
        return $match;
      },
      null
    );
  }

  private static function generateActionsFromPlugins(
    $pluginList,
    $currentPlugins,
    $wantedPlugins
  ) {
    return array_reduce(
      $pluginList,
      function ($actions, $pluginName) use ($currentPlugins, $wantedPlugins) {
        // Get the matching information from the wanted plugin list
        $wantedPlugin = self::findPluginWithName($wantedPlugins, $pluginName);

        // Delete removed plugins
        if ($wantedPlugin === null) {
          $actions['delete'][] = $pluginName;
          return $actions;
        }

        // Get the matching information from the current plugin list
        $currentPlugin = self::findPluginWithName($currentPlugins, $pluginName);

        // Install new plugins
        if ($currentPlugin === null) {
          $actions['install'][] = $wantedPlugin;
          $actions['activate'][] = $wantedPlugin;
          return $actions;
        }

        // Activate or deactivate plugins if the action has changed
        if ($currentPlugin['status'] !== $wantedPlugin['status']) {
          if ($wantedPlugin['status'] === 'active') {
            $actions['activate'][] = $wantedPlugin;
          } else {
            $actions['deactivate'][] = $wantedPlugin;
          }
          return $actions;
        }

        // Update plugins with different versions
        if ($currentPlugin['version'] !== $wantedPlugin['version']) {
          $actions['update'][] = $wantedPlugin;
          return $actions;
        }

        // Ignore; the plugin is already setup
        return $actions;
      },
      []
    );
  }

  private static function getCurrentPluginList()
  {
    $wp_cli_options = [
      'exit_error' => true, // Halt script execution on error
      'launch' => false, // Reuse the current process
      'parse' => 'json', // Parse captured STDOUT to JSON array
      'return' => true, // Return 'STDOUT'; use 'all' for full object
    ];

    return WP_CLI::runcommand('plugin list --format=json', $wp_cli_options);
  }

  private static function pipe($functions, $value)
  {
    $fn = array_shift($functions);
    $nextValue = $fn($value);
    return empty($functions) ? $nextValue : self::pipe($functions, $nextValue);
  }

  private static function runActionOnPlugins($action, $plugins, $options)
  {
    $isDryRun = $options['dry-run'];
    $wp_cli_options = ['exit_error' => true, 'launch' => false];

    if ($isDryRun) {
      echo "{$action}\n";

      foreach ($plugins as $plugin) {
        $pluginName = $action === 'delete' ? $plugin : $plugin['name'];
        echo "  - {$pluginName}\n";
      }

      return;
    }

    // Install and update must be run one at a time in order to get the correct version
    if ($action === 'install' || $action === 'update') {
      foreach ($plugins as $plugin) {
        $command = "plugin {$action} {$plugin['name']} --version={$plugin['version']}";
        WP_CLI::runcommand($command, $wp_cli_options);
        WP_CLI::success($command);
      }

      return;
    }

    $pluginNames =
      $action === 'delete' ? $plugins : array_column($plugins, 'name');

    $command = "plugin {$action} " . implode(' ', $pluginNames);
    WP_CLI::runcommand($command, $wp_cli_options);
    WP_CLI::success($command);
    return;
  }
}

WP_CLI::add_command('plugin-list', 'PluginListCommand');
