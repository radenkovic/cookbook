const ch = require('chalk');
module.exports = (error) => {
  console.log(ch.red('Skafold encountered an error:'), error.message);
};
