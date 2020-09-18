const chalk = require('chalk');
const { version } = require('../../package.json');

module.exports = (recipe) => {
  console.log(`${chalk.dim.gray('Recipe:')} ${chalk.cyan.bold(recipe.name)}`);
  if (recipe.description)
    console.log(`${chalk.gray('Description:')} ${recipe.description}`);

  console.log('Next actions will be performed:');
  console.log();
  recipe.files.forEach((file) => {
    const color = 'green';
    const state = file.state;
    console.log(`- ${chalk[color](state)} ${file.destination}`);
  });
  console.log();
};
