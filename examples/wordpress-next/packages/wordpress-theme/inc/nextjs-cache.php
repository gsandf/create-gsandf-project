<?php

/**
 * Clears a cache in Next.js that handles GraphQL requests
 */
function gsandf_wordpress_clear_nextjs_cache()
{
  $endpoint = sprintf(
    '%s://%s:%s%s',
    $_SERVER['REQUEST_SCHEME'],
    $_SERVER['SERVER_ADDR'],
    $_SERVER['SERVER_PORT'],
    '/api/clear-cache'
  );

  file_get_contents($endpoint);
}

/**
 * Add action to admin toolbar to clear the cache
 */
function modify_admin_bar($wp_admin_bar)
{
  $wp_admin_bar->add_node([
    'id' => 'gsandf_wordpress_clear_nextjs_cache',
    'title' => 'Clear Theme Cache',
    'meta' => ['onclick' => 'fetch("/api/clear-cache")'],
  ]);
}

add_action('admin_bar_menu', 'modify_admin_bar', 90);
add_action('save_post', 'gsandf_wordpress_clear_nextjs_cache');
add_action('gform_after_save_form', 'gsandf_wordpress_clear_nextjs_cache');
