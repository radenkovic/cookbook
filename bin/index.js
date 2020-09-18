const store = require('../lib');
const { argv } = require('yargs');
const chalk = require('chalk');
const { version } = require('../package.json');

console.log(`

${chalk.bgCyan.blue(' Skafold ')} ${version}
`);

const [method, url, recipePath] = argv._;

if (method === 'from') {
  store.dispatch('git', { url, recipePath });
}
