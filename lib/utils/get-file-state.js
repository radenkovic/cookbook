module.exports = (file) => {
  const exists = file.exists_in_destination;
  const existsRecipe = file.exists_in_recipe;

  if (!existsRecipe) {
    return 'missing';
  } else if (!exists) {
    return 'create';
  } else if (exists && file.strategy.includes('merge')) {
    return 'merge';
  } else if (exists && file.strategy === 'replace') {
    return 'replace';
  } else if (exists && ['skip-if-exists', 'skip'].includes(file.strategy)) {
    return 'skip';
  }
};
