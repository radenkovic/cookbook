const yaml = require('js-yaml');
const fs = require('fs');

module.exports = (recipePath) => {
  return yaml.load(fs.readFileSync(recipePath));
};
