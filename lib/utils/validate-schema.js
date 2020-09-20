const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');

module.exports = (recipe) => {
  let schema;
  try {
    schema = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, `../schemas/${recipe.version}.yml`))
    );
  } catch (e) {
    console.log(e.message);
    throw new Error(`Invalid cookbook schema version ${recipe.version}.`);
  }

  const ajv = new Ajv({ allErrors: true });
  const valid = ajv.validate(schema, recipe);
  if (!valid) {
    const errors = JSON.stringify(ajv.errors, null, 2);
    throw new Error('recipe.yml has invalid schema: \n' + errors);
  }
};
