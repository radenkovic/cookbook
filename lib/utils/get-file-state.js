const {
  MISSING,
  CREATE,
  MERGE,
  REPLACE,
  SKIP,
  REMOVE,
} = require('../constants/file-states');

module.exports = (file) => {
  const exists = file.exists_in_destination;
  const existsRecipe = file.exists_in_recipe;
  if (exists && file.strategy.startsWith(REMOVE)) {
    return REMOVE;
  } else if (!existsRecipe) {
    return MISSING;
  } else if (!exists) {
    return CREATE;
  } else if (exists && file.strategy.startsWith(MERGE)) {
    return MERGE;
  } else if (exists && file.strategy === REPLACE) {
    return REPLACE;
  } else if (exists && file.strategy.startsWith(SKIP)) {
    return SKIP;
  }
  return SKIP;
};
