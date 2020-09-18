const path = require('path');

module.exports = (recipePath, defaultRecipeName) => {
  const ext = path.extname(recipePath);

  // Suport relative and absolute links
  if (!path.isAbsolute(recipePath)) {
    recipePath = path.join(process.cwd(), recipePath);
  }

  // If recipe name is not provided -- use default (no extension)
  if (!ext) {
    recipePath = path.join(recipePath, defaultRecipeName);
  }

  const recipeDir = path.dirname(recipePath);
  return [recipePath, recipeDir];
};
