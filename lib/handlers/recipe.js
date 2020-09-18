const { selectFilesPrompt, recipeStats } = require('../prompts');
const {
  validateSchema,
  createRecipePath,
  createFileAttributes,
  readRecipe,
} = require('../utils');

module.exports = async (yamlPath, store) => {
  let recipe;

  // Build path to recipe
  const [recipePath, recipeDir] = createRecipePath(
    yamlPath,
    store.get('defaultRecipeName')
  );

  // Read the recipe
  try {
    recipe = readRecipe(recipePath);
  } catch (e) {
    throw new Error(
      `Could find/read recipe in the cloned repository. Please check your recipe file`
    );
  }
  // Validate schema
  try {
    validateSchema(recipe);
  } catch (e) {
    throw new Error(e.message);
  }

  // Prepare files for write
  recipe.files = recipe.files.map(createFileAttributes(recipeDir));

  // Log actions
  recipeStats(recipe);
  recipe.files = await selectFilesPrompt(recipe.files, store);

  store.set('files', recipe.files);
  store.set('recipe', recipe);
  store.dispatch('recipe-done');
};
