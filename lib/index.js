const Store = require('./store');
const {
  GIT,
  READ_RECIPE,
  EXECUTE_RECIPE,
  CLEANUP,
  HELP,
} = require('./constants/events');

const errorHandler = require('./handlers/error');
const gitHandler = require('./handlers/git');
const recipeHandler = require('./handlers/recipe');
const executeHandler = require('./handlers/execute');
const cleanupHandler = require('./handlers/cleanup');
const helpHandler = require('./handlers/help');

// Register global error handler
process.on('unhandledRejection', errorHandler);

// Create a store
const store = new Store();

// Register Handlers
store.register(GIT, gitHandler);
store.register(READ_RECIPE, recipeHandler);
store.register(EXECUTE_RECIPE, executeHandler);
store.register(CLEANUP, cleanupHandler);
store.register(HELP, helpHandler);

module.exports = store;
