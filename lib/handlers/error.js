const ch = require('chalk');
module.exports = (error) => {
  console.log(ch.red('Skafold encountered an error:'));
  console.log(error.stack);
};
