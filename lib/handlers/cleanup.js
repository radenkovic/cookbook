const rimraf = require('rimraf');
module.exports = (payload, store) => {
  const dir = store.get('defaultRecipeDir');
  rimraf.sync(dir);
};
