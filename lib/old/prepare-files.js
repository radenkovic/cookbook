const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = async (recipe) => {
  console.log('Next actions will be performed:');
  console.log('');
  recipe.files.forEach((file) => {
    const exists = file.exists;
    const log = (method, color) => {
      console.log(`- ${chalk[color](method)} ${file.destination}`);
      file.message = `${chalk[color](method)} ${file.destination}`;
      file.method = method;
    };

    if (!exists) {
      log('create    ', 'green');
    }
    if (exists && file.strategy.includes('merge')) {
      log('merge     ', 'cyan');
    }
    if (exists && file.strategy === 'replace') {
      log('replace   ', 'red');
    }
  });
  console.log('');
  const { proceed } = await inquirer.prompt({
    type: 'rawlist',
    name: 'proceed',
    message: 'Do you want to proceed?',
    choices: [
      {
        key: 'y',
        name: 'Yes',
        value: true,
      },
      {
        key: 'n',
        name: 'No',
        value: false,
      },
      {
        key: 's',
        name: 'I want to select files manually',
        value: 'select',
      },
    ],
  });
  if (!proceed) process.exit(0); // eslint-disable-line
  if (proceed === 'select') {
    const { selected_files } = await inquirer.prompt({
      type: 'checkbox',
      name: 'selected_files',
      choices: [
        ...recipe.files.map((f) => ({
          name: f.message,
          value: f.name,
          checked: true,
        })),
      ],
    });
    recipe.files = recipe.files.filter((f) => selected_files.includes(f.name));
  }
};
