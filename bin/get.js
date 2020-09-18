const store = require('../lib');
const { argv } = require('yargs');

console.log(argv);

const [, url, recipePath] = argv._;

store.dispatch('git', { url, recipePath });
