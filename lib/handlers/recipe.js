const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const Ajv = require('ajv');
const shortId = require('shortid');
const getState = require('../utils/get-file-state');
const selectFilesPrompt = require('../prompts/select-files');

const schema = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '../schema.yml'))
);

module.exports = async (recipePath, store) => {
  let filename = path.basename(recipePath);
  const ext = path.extname(recipePath);

  // Suport relative and absolute links
  if (!path.isAbsolute(recipePath)) {
    recipePath = path.join(process.cwd(), recipePath);
  }

  // If recipe name is not provided -- use default (no extension)
  if (!ext) {
    recipePath = path.join(recipePath, store.get('defaultRecipeName'));
  }

  const recipeDir = path.dirname(recipePath);
  let recipe;

  // Read the recipe
  try {
    recipe = yaml.load(fs.readFileSync(recipePath));
  } catch (e) {
    throw new Error(
      `Could find/read ${filename} in the cloned repository. Please check your recipe file`
    );
  }

  // Validate Schema
  const ajv = new Ajv({ allErrors: true });
  const valid = ajv.validate(schema, recipe);
  if (!valid) {
    const errors = JSON.stringify(ajv.errors, null, 2);
    throw new Error('recipe.yml has invalid schema: \n' + errors);
  }

  // Prepare files for write
  recipe.files.forEach((file) => {
    file.id = shortId.generate();
    file.filename = path.basename(file.path);
    file.extension = path.extname(file.path);
    file.destination = file.destination || file.path;

    file.recipe_path = path.join(recipeDir, file.path);
    file.destination_path = path.join(process.cwd(), file.destination);
    file.destination_folder = path.dirname(file.destination_path);

    file.exists_in_recipe = fs.existsSync(file.recipe_path);
    file.exists_in_destination = fs.existsSync(file.destination_path);

    file.state = getState(file);
    file.selected = !['skip', 'missing'].includes(file.state);
  });

  // TODO: ask to select files / confirm
  recipe.files = await selectFilesPrompt(recipe.files);

  store.set('files', recipe.files);
  store.set('recipe', recipe);
  store.dispatch('recipe-done');
};
