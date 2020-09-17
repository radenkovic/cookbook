const Store = require('./store');
const errorHandler = require('./handlers/error');
const gitHandler = require('./handlers/git');
const recipeHandler = require('./handlers/recipe');

// Register global error handler
process.on('unhandledRejection', errorHandler);

// Create a store
const store = new Store();

// Create collections
store.addCollection('events');
store.addCollection('files');

// Register Handlers
store.register('git', gitHandler);
store.register('git-done', recipeHandler);
store.register('error', errorHandler);

// Test
store.dispatch('git-done', store.get('tmpDir'));
