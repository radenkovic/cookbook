#!/usr/bin/env node
const { GIT } = require('../lib/constants/events');

const store = require('../lib');
const { argv } = require('yargs');
const chalk = require('chalk');
const { version } = require('../package.json');

console.log(`

${chalk.bgCyan.blue(' Skafold ')} ${version}
`);

const [method, a, b] = argv._;

switch (method) {
  case 'from':
    store.dispatch(GIT, { url: a, recipePath: b });
    break;
  case 'local':
    store.dispatch('recipe', a);
    break;
  case 'cleanup':
    store.dispatch('cleanup');
    break;
  case 'help':
    store.dispatch('help');
    break;
  default:
    store.dispatch('help');
}
