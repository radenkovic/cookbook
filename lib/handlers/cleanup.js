const rimraf = require('rimraf');
const chalk = require('chalk');

module.exports = (payload, store) => {
  const dir = store.get('defaultRecipeDir');
  rimraf.sync(dir);
  console.log(chalk.gray('Succesfully removed skafold artficacts'));
};
