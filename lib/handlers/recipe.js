const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const Ajv = require('ajv');
const getAction = require('../utils/get-action');

const schema = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '../schema.yml'))
);

module.exports = (recipePath, store) => {
  const dir = store.get('recipeDir');
  const recipeName = store.get('recipeName');
  let recipe;

  // Read the recipe
  try {
    recipe = yaml.load(fs.readFileSync(path.join(dir, recipeName)));
  } catch (e) {
    throw new Error(`Could find/read ${recipeName} in the cloned repository`);
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
    file.destination = file.destination || file.name;
    file.exists_in_recipe = fs.existsSync(path.join(dir, file.name));
    file.exists_in_dir = fs.existsSync(
      path.join(process.cwd(), file.destination)
    );
    file.action = getAction(file);
  });

  console.log('Reading recipe', recipe);
};
