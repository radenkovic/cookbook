exports.GIT = 'git';
exports.GIT_SUCCESS = 'git-success';
exports.GIT_ERROR = 'git-error';

exports.READ_RECIPE = 'read-recipe';
exports.READ_RECIPE_SUCCESS = 'read-recipe-success';
exports.READ_RECIPE_ERROR = 'read-recipe-error';

exports.EXECUTE_RECIPE = 'execute-recipe';
exports.EXECUTE_RECIPE_SUCCESS = 'execute-recipe-success';

exports.CLEANUP = 'cleanup';
exports.CLEANUP_SUCCESS = 'cleanup-success';

exports.ERROR = 'error';
exports.HELP = 'help';

exports.success = (event) => {
  return `${event}-success`;
};

exports.error = (event) => {
  return `${event}-error`;
};
