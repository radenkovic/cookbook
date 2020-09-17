const Store = require('./store');
const errorHandler = require('./handlers/error');
const gitHandler = require('./handlers/git');
const recipeHandler = require('./handlers/recipe');
const cookHandler = require('./handlers/cook');

// Register global error handler
process.on('unhandledRejection', errorHandler);

// Create a store
const store = new Store();

// Create collections
store.addCollection('events');
store.addCollection('recipes');
store.addCollection('files');

// Register Handlers
store.register('git', gitHandler);
store.register('git-done', recipeHandler);
store.register('recipe-done', cookHandler);
store.register('error', errorHandler);

// Test
store.dispatch('git-done', 'skafold-recipe');
