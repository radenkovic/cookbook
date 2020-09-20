const rimraf = require('rimraf');
const chalk = require('chalk');

module.exports = (payload, store, done) => {
  const dir = store.get('defaultRecipeDir');
  try {
    rimraf.sync(dir);
    console.log(chalk.gray('Succesfully removed cookbook artficacts.'));
    done();
  } catch (e) {
    done(e);
  }
};
