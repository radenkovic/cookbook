const Ajv = require('ajv');
const chalk = require('chalk');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
// const betterAjvErrors = require('better-ajv-errors');

module.exports = (data) => {
  const schema = yaml.safeLoad(
    fs.readFileSync(path.join(__dirname, 'schema.yml'))
  );
  const ajv = new Ajv({ allErrors: true });
  const valid = ajv.validate(schema, data);
  if (!valid) {
    console.log(chalk.red('Error! recipe.yml has invalid structure:'));
    // const output = betterAjvErrors(schema, data, ajv.errors, { indent: 2 });
    console.log(JSON.stringify(ajv.errors, null, 2));
      process.exit(1); // eslint-disable-line
  }
};
