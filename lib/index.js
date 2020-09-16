const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const validate = require('./validate-recipe-schema');
const prepareFiles = require('./prepare-files');
const preflight = require('./preflight');
const pJson = require('../package.json');
const exec = require('./exec');

const readFile = (...args) =>
  fs.readFileSync(path.join(process.cwd(), 'skafold-recipe', ...args), 'utf-8');

async function run() {
  // Load the file
  const recipe = yaml.safeLoad(readFile('recipe.yml'));
  if (!recipe) {
    console.log(chalk.red('File recipe.yml is missing or unreadable'));
    process.exit(1); // eslint-disable-line
  }

  // Validate schema
  validate(recipe);

  // Preflight
  await preflight(recipe);

  // Write header & info
  console.log(`
| ${chalk.bgCyan.blue(' Skafold ')} ${pJson.version}
| ${chalk.dim.gray('Recipe:')} ${chalk.cyan.bold(recipe.name)}`);
  if (recipe.description)
    console.log(`| ${chalk.gray('Description:')} ${recipe.description}`);

  // Select files
  await prepareFiles(recipe);

  await exec(recipe);
}

run();
