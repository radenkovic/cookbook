#!/usr/bin/env node
const { GIT, READ_RECIPE, CLEANUP, HELP } = require('../lib/constants/events');

const store = require('../lib');
const { argv } = require('yargs');
const chalk = require('chalk');
const { version } = require('../package.json');

console.log(`

${chalk.bgCyan.blue(' Skafold ')} ${version}
`);

const [method, a, b] = argv._;

switch (method) {
  case 'git':
    store.dispatch(GIT, { url: a, recipePath: b });
    break;
  case 'local':
    store.dispatch(READ_RECIPE, a);
    break;
  case CLEANUP:
    store.dispatch(CLEANUP);
    break;
  case HELP:
    store.dispatch(HELP);
    break;
  default:
    store.dispatch(GIT, { url: method, recipePath: a });
}
