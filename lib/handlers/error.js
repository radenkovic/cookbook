const ch = require('chalk');
module.exports = (error) => {
  console.log(ch.red('Cookbook run-recipe encountered an error:'));
  console.log(error.stack);
};
