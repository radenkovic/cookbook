const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');
const chalk = require('chalk');
const sortPackageJson = require('sort-package-json');

module.exports = (recipe) => {
  console.log();
  console.log(chalk.cyan(`✨ Creating files...`));
  console.log();
  recipe.files.forEach(async (file) => {
    const localTarget = path.join(process.cwd(), file.destination);
    const recipeTarget = path.join(process.cwd(), 'skafold-recipe', file.name);
    const recipe = fs.readFileSync(recipeTarget, 'utf-8');

    // Merge
    if (file.exists && file.strategy.startsWith('merge')) {
      try {
        const local = JSON.parse(fs.readFileSync(localTarget));
        const jsonRecipe = JSON.parse(recipe);

        let json =
          file.strategy === 'merge-left'
            ? JSON.stringify(merge(jsonRecipe, local), null, 2)
            : JSON.stringify(merge(local, jsonRecipe), null, 2);
        if (localTarget.endsWith('package.json')) {
          json = sortPackageJson(json);
        }
        fs.writeFileSync(localTarget, json);
      } catch (e) {
        console.log(
          chalk.red(
            `Merge strategy failed. Could not import ${file.destination}. Merge strategy works only with .json files`
          )
        );
        console.log('Error:', e.message);
        process.exit(1); // eslint-disable-line
      }
    }

    // Replace
    if (file.exists && file.strategy === 'replace') {
      fs.writeFileSync(localTarget, recipe);
    }

    // Create
    if (!file.exists) {
      const dirname = path.dirname(localTarget);
      fs.mkdirSync(dirname, { recursive: true });
      fs.writeFileSync(localTarget, recipe);
    }

    const fileName = path.basename(localTarget);
    console.log(`✔️ ${file.method} ${fileName}`);
  });

  console.log();
  console.log(
    chalk.green(`🎉 Success!`),
    `${recipe.files.length} files created/updated.`
  );
  const updated = recipe.files.filter((f) =>
    f.destination.includes('package.json')
  );
  if (updated.length) {
    console.log(
      '🤗',
      chalk.yellow('package.json'),
      `file is modified, you may need to run ${chalk.yellow(
        'npm install'
      )} or ${chalk.yellow('yarn install')} to update the dependencies.
    `
    );
  }
};
