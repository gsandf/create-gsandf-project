import got from 'got';
import meow from 'meow';
import * as path from 'path';
import promisepipe from 'promisepipe';
import tar from 'tar';

async function main() {
  const cli = meow(
    `
    Usage
      $ create-wordpress <project-directory>

    Options:
      -h, --help  output usage information
      --version   output the version number
  `,
    {
      autoHelp: true,
      autoVersion: true,
      flags: {
        help: { type: 'boolean', alias: 'h' },
        version: { type: 'boolean', alias: 'V' }
      }
    }
  );

  const projectDirectory = getProjectDirectory(cli.input);
  const projectName = path.basename(projectDirectory);

  return downloadAndExtractExample(projectDirectory);
}

async function downloadAndExtractExample(root) {
  return promisepipe(
    got.stream(
      `https://codeload.github.com/blakek/wip-wordpress-next/tar.gz/master`
    ),
    tar.extract({ cwd: root, strip: 3 }, ['wip-wordpress-next/packages/site'])
  );
}

function getProjectDirectory(args) {
  // Ensure we get exactly one folder for project directory
  if (args.length < 1) {
    console.error('Error: `project-directory` is required');
    process.exit(3);
  }

  if (args.length > 1) {
    console.error('Error: expected single argument for `project-directory`');
    process.exit(4);
  }

  return path.resolve(args[0]);
}

main();
