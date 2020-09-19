exports.GIT = 'git';

exports.READ_RECIPE = 'read-recipe';

exports.EXECUTE_RECIPE = 'execute-recipe';

exports.CLEANUP = 'cleanup';

exports.ERROR = 'skf-error';
exports.HELP = 'help';

exports.success = (event) => {
  return `${event}-success`;
};

exports.error = (event) => {
  return `${event}-error`;
};
