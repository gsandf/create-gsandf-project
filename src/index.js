import execa from 'execa';
import { constants as fsConstants, promises as fs } from 'fs';
import got from 'got';
import meow from 'meow';
import path from 'path';
import promisepipe from 'promisepipe';
import tar from 'tar';

async function main() {
  const cli = meow(
    `
    Usage
      $ create-wordpress <project-directory>

    Options:
      -e, --example  the example to download
      -h, --help     output usage information
      --version      output the version number
  `,
    {
      autoHelp: true,
      autoVersion: true,
      flags: {
        example: {
          required: true,
          alias: 'e',
          default: 'wordpress-next'
        },
        help: { type: 'boolean', alias: 'h' },
        version: { type: 'boolean', alias: 'V' }
      }
    }
  );

  const projectDirectory = await getProjectDirectory(cli.input);

  await downloadAndExtractExample(projectDirectory, cli.flags.example);
  await setupProject(projectDirectory);
}

/**
 * Given a path, checks if path is a directory or tries to create a directory
 * @param {string} path - path to check
 * @return {Promise<void>} resolves if a directory is at the given path; rejects
 * if one could not be created
 */
async function ensureDirectoryExists(path) {
  try {
    await fs.access(path, fsConstants.O_DIRECTORY);
  } catch (error) {
    await fs.mkdir(path, { mode: 0o755 });
  }
}

/**
 * Execute a command and stream output to the current process's output
 * @param {string} file - the command to run
 * @param {string[]} args? - the command's arguments
 * @param {object} options? - options passed to execa
 * @return {Promise<any>}
 */
async function execute(file, args, options) {
  const command = execa(file, args, options);
  command.stdout.pipe(process.stdout);
  command.stderr.pipe(process.stderr);
  return command;
}

/**
 * Downloads the example repo to a given directory
 * @param {string} path - path to extract to
 * @return {Promise<any>}
 */
async function downloadAndExtractExample(path, example) {
  return promisepipe(
    got.stream(
      `https://codeload.github.com/gsandf/create-gsandf-project/tar.gz/master`
    ),
    tar.extract({ cwd: path, strip: 3 }, [
      `create-gsandf-project-master/examples/${example}`
    ])
  );
}

/**
 * Gets the project directory from arguments, ensuring it is a valid directory
 * @param {string[]} args arguments passed to the CLI
 * @return {Promise<string>} the path to an empty project directory
 */
async function getProjectDirectory(args) {
  // Ensure we get exactly one folder for project directory
  if (args.length < 1) {
    throw new Error('`project-directory` is required');
  }

  if (args.length > 1) {
    throw new Error('expected single argument for `project-directory`');
  }

  const projectDirectory = path.resolve(args[0]);

  // Ensure project directory exists
  await ensureDirectoryExists(projectDirectory);

  // Ensure project directory doesn't contain files that would be overwritten
  const existingFiles = await fs.readdir(projectDirectory);

  if (existingFiles.length !== 0) {
    throw new Error(
      `would overwrite files in existing directory: ${projectDirectory}`
    );
  }

  return projectDirectory;
}

/**
 * Customize the example repository for starting a new project
 * @param {string} root - the directory to setup the project in
 * @return {Promise<void>}
 */
async function setupProject(root) {
  // Adjust properties in the package.json
  const projectName = path.basename(root);
  const packageJSON = await fs
    .readFile(`${root}/package.json`, {
      encoding: 'utf-8'
    })
    .then(JSON.parse);

  packageJSON.name = projectName;
  packageJSON.version = '0.0.1';

  fs.writeFile(`${root}/package.json`, JSON.stringify(packageJSON, null, 2));

  const cmd = (command, args) => execute(command, args, { cwd: root });

  // Create a repo
  await cmd('git', ['init']);

  // Install dependencies using Yarn
  await cmd('yarn', ['install']);

  // Create an initial commit
  await cmd('git', ['add', '-A']);
  await cmd('git', ['commit', '-m', ':tada: initial commit']);
}

main().catch(error => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
