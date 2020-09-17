module.exports = (file) => {
  const exists = file.exists_in_dir;
  const existsRecipe = file.exists_in_recipe;

  if (!existsRecipe) {
    return 'ignore';
  } else if (!exists) {
    return 'create';
  } else if (exists && file.strategy.includes('merge')) {
    return 'merge';
  } else if (exists && file.strategy === 'replace') {
    return 'replace';
  }
};
