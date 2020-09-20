const {
  selectFilesPrompt,
  recipeStats,
  promptVariables,
} = require('../prompts');
const {
  validateSchema,
  createRecipePath,
  createFileAttributes,
  readRecipe,
} = require('../utils');
const { EXECUTE_RECIPE } = require('../constants/events');

module.exports = async (yamlPath, store, done) => {
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
    return done(
      new Error(
        `Could not find/read recipe in the cloned repository: ${e.message}`
      )
    );
  }

  // Validate schema
  try {
    validateSchema(recipe);
  } catch (e) {
    return done(e);
  }

  // Render variables
  try {
    recipe = await promptVariables(recipe);
  } catch (e) {
    return done(e);
  }

  // Prepare files for write
  recipe.files = recipe.files.map(createFileAttributes(recipeDir));

  // Log actions
  recipeStats(recipe);
  recipe.files = await selectFilesPrompt(recipe.files);

  done(null, EXECUTE_RECIPE, recipe);
};
