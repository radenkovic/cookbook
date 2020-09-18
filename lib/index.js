const Store = require('./store');
const errorHandler = require('./handlers/error');
const gitHandler = require('./handlers/git');
const recipeHandler = require('./handlers/recipe');
const copyHandler = require('./handlers/copy');

// Register global error handler
process.on('unhandledRejection', errorHandler);

// Create a store
const store = new Store();

// Register Handlers
store.register('git', gitHandler);
store.register('git-done', recipeHandler);
store.register('recipe-done', copyHandler);
store.register('error', errorHandler);

// Test
store.dispatch('git-done', 'skafold-recipe');

module.exports = store;
