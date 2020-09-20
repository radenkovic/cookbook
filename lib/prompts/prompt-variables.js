const inquirer = require('inquirer');
const mustache = require('mustache');

module.exports = async (recipe) => {
  if (!recipe.variables) return recipe;

  const vars = await inquirer.prompt([
    ...recipe.variables.map((variable) => ({
      type: 'input',
      name: variable.name,
      message: variable.prompt || `Enter value for ${variable.name}`,
      default: variable.default,
    })),
  ]);
  const toJson = JSON.stringify(recipe);
  const applyVars = mustache.render(toJson, vars);
  const toObject = JSON.parse(applyVars);
  return toObject;
};
