#!/usr/bin/env node

const store = require('../lib');
const { argv } = require('yargs');
const chalk = require('chalk');
const { version } = require('../package.json');

console.log(`

${chalk.bgCyan.blue(' Skafold ')} ${version}
`);

const [method, url, recipePath] = argv._;

switch (method) {
  case 'from':
    store.dispatch('git', { url, recipePath });
    break;
  case 'local':
    store.dispatch('recipe', url);
    break;
  case 'cleanup':
    store.dispatch('cleanup');
    break;
  default:
    store.dispatch('git', { url, recipePath });
    break;
}
