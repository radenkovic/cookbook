const fs = require('fs');
const { CREATE, REPLACE, MERGE, REMOVE } = require('../constants/file-states');
const sortPackageJson = require('sort-package-json');
const successMessage = require('../prompts/success');
const { merge } = require('lodash');

const mergeJson = (a, b) =>
  JSON.stringify(merge(JSON.parse(a), JSON.parse(b)), null, 2);

module.exports = (recipe, store, done) => {
  try {
    recipe.files
      .filter((f) => f.selected)
      .forEach((file) => {
        const dest = file.destination_path;
        // Create or overwrite
        if (file.state === CREATE || file.state === REPLACE) {
          const data = fs.readFileSync(file.recipe_path, 'utf8');
          fs.mkdirSync(file.destination_folder, { recursive: true });
          fs.writeFileSync(dest, data);
        }
        // Remove

        if (file.state === REMOVE) {
          fs.unlinkSync(dest);
        }

        // Merge
        if (file.state === MERGE) {
          const data = fs.readFileSync(file.recipe_path, 'utf8');
          const localData = fs.readFileSync(dest, 'utf8');
          let json =
            file.strategy === 'merge-left' || file.stratey === 'merge' // default is merge(-left)
              ? mergeJson(data, localData)
              : mergeJson(localData, data);
          if (dest.endsWith('package.json')) {
            json = sortPackageJson(json);
          }
          fs.writeFileSync(dest, json);
        }
      });
  } catch (e) {
    return done(e);
  }

  successMessage(recipe.files);
  done();
};
