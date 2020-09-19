const chalk = require('chalk');
const { MISSING, MERGE, REPLACE, SKIP } = require('../constants');
const { sortBy } = require('lodash');

module.exports = (recipe) => {
  console.log(`${chalk.dim.gray('Recipe:')} ${chalk.cyan.bold(recipe.name)}`);
  if (recipe.description)
    console.log(`${chalk.gray('Description:')} ${recipe.description}`);

  // Sort the files
  recipe.files = sortBy(recipe.files, 'state');

  console.log('Next actions will be performed:');
  console.log();
  recipe.files.forEach((file) => {
    let color;
    let action;
    let details;
    switch (file.state) {
      case MISSING:
        action = 'do nothing';
        color = 'gray';
        details = '(missing from the recipe folder)';
        break;
      case REPLACE:
        action = 'do nothing';
        color = 'yellow';
        break;
      case MERGE:
        action = 'merge';
        color = 'yellow';
        break;
      case SKIP:
        action = 'do nothing';
        color = 'gray';
        break;
      default:
        color = 'green';
        action = file.state;
        break;
    }

    console.log(
      `- ${chalk[color](action)} ${file.destination} ${chalk.gray(
        details || ''
      )}`
    );
  });
  console.log();
};
