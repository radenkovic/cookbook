const Store = require('./store');
const {
  GIT,
  GIT_SUCCESS,
  READ_RECIPE,
  READ_RECIPE_SUCCESS,
  EXECUTE_RECIPE,
  EXECUTE_RECIPE_SUCCESS,
  CLEANUP,
  HELP,
} = require('./constants/events');

const errorHandler = require('./handlers/error');
const gitHandler = require('./handlers/git');
const recipeHandler = require('./handlers/recipe');
const copyHandler = require('./handlers/copy');
const cleanupHandler = require('./handlers/cleanup');
const helpHandler = require('./handlers/help');

// Register global error handler
process.on('unhandledRejection', errorHandler);

// Create a store
const store = new Store();

// Register Handlers
store.register(GIT, gitHandler);
store.register(GIT_SUCCESS, recipeHandler);
store.register(READ_RECIPE, recipeHandler);
store.register(READ_RECIPE_SUCCESS, copyHandler);
store.register(EXECUTE_RECIPE, copyHandler);
store.register(EXECUTE_RECIPE_SUCCESS, cleanupHandler);
store.register(CLEANUP, cleanupHandler);
store.register(HELP, helpHandler);

module.exports = store;
