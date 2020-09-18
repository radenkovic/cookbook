const fs = require('fs');
const sortPackageJson = require('sort-package-json');
const { merge } = require('lodash');
const rimraf = require('rimraf');

const mergeJson = (a, b) =>
  JSON.stringify(merge(JSON.parse(a), JSON.parse(b)), null, 2);

module.exports = (payload, store) => {
  const recipe = store.get('recipe');
  console.log(
    'Ready for cooking',
    recipe.files,
    recipe.files.map((f) => ({ from: f.recipe_path, to: f.destination_path }))
  );

  recipe.files
    .filter((f) => f.selected)
    .forEach((file) => {
      const dest = file.destination_path;
      const data = fs.readFileSync(file.recipe_path, 'utf8');
      // Create or overwrite
      if (file.state === 'create' || file.state === 'replace') {
        fs.mkdirSync(file.destination_folder, { recursive: true });
        fs.writeFileSync(dest, data);
      }

      // Merge
      if (file.state === 'merge') {
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

  // Cleanup
  const dir = store.get('defaultRecipeDir');
  rimraf.sync(dir);
};
