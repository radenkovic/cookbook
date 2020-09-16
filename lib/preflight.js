const fs = require('fs');
const chalk = require('chalk');
const { sortBy } = require('lodash');
const path = require('path');
const inquirer = require('inquirer');

module.exports = async (recipe) => {
  // Check if files exist
  recipe.files = recipe.files.map((file) => {
    file.destination = file.destination || file.name;
    file.exists = fs.existsSync(path.join(process.cwd(), file.destination));
    file.recipe_exists = fs.existsSync(
      path.join(process.cwd(), 'skafold-recipe', file.name)
    );

    return file;
  });
  recipe.files = sortBy(recipe.files, ['exists', 'strategy']);
  const missing = recipe.files.filter((f) => !f.recipe_exists);
  if (missing.length) {
    console.log(
      `Some files are listed in ${chalk.cyan(
        'recipe.yml'
      )} but do not exist in the recipe directory:`
    );
    missing.forEach((f) => {
      console.log(chalk.yellow(`- ${f.name}`));
    });

    const { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to continue without missing files?',
      default: false,
    });
    if (!confirm) process.exit(0);  // eslint-disable-line
    const ids = missing.map((f) => f.name);
    recipe.files = recipe.files.filter((f) => !ids.includes(f.name));
  }
};
