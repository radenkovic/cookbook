const getState = require('./get-file-state');
const shortId = require('shortid');
const path = require('path');
const fs = require('fs');

module.exports = (recipeDir) => (file) => {
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
  return file;
};
