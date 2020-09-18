const inquirer = require('inquirer');

module.exports = async (files) => {
  let selectedFiles = [...files];
  const { proceed } = await inquirer.prompt({
    type: 'rawlist',
    name: 'proceed',
    message: 'Do you want to proceed?',
    choices: [
      {
        key: 'y',
        name: 'Yes',
        value: 'yes',
      },
      {
        key: 'n',
        name: 'No',
        value: 'no',
      },
      {
        key: 's',
        name: 'I want to select files manually',
        value: 'select',
      },
    ],
  });
  if (proceed === 'no') {
    process.exit(0); // eslint-disable-line
  }
  if (proceed === 'select') {
    const { checked } = await inquirer.prompt({
      type: 'checkbox',
      name: 'checked',
      message: 'Select files you want to use:',
      choices: [
        ...selectedFiles
          .filter((f) => f.selected)
          .map((f) => ({
            name: `[${f.state}] ${f.path}`,
            value: f.id,
            checked: true,
          })),
      ],
    });
    selectedFiles = selectedFiles.map((file) => {
      file.selected = false;
      if (checked.includes(file.id)) {
        file.selected = true;
      }
      return file;
    });
  }

  return selectedFiles;
};
