const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const Ajv = require('ajv');
const getState = require('../utils/get-file-state');

const schema = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '../schema.yml'))
);

module.exports = (recipePath, store) => {
  let filename = path.basename(recipePath);
  const ext = path.extname(recipePath);

  // Suport relative and absolute links
  if (!path.isAbsolute(recipePath)) {
    recipePath = path.join(process.cwd(), recipePath);
  }

  // If recipe name is not provided -- use default (no extension)
  if (!ext) {
    recipePath = path.join(recipePath, store.get('recipeName'));
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
    file.destination = file.destination || file.path;
    file.filename = path.basename(file.destination);

    file.recipe_path = path.join(recipeDir, file.path);
    file.destination_path = path.join(recipeDir, file.destination);

    file.exists_in_recipe = fs.existsSync(file.recipe_path);
    file.exists_in_destination = fs.existsSync(file.destination_path);

    file.state = getState(file);
  });

  store.collection('files').insert(recipe.files);
  store.collection('recipes').insert(recipe);
  store.dispatch('recipe-done');
};
