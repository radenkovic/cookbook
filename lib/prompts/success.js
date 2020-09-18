const chalk = require('chalk');

module.exports = (files) => {
  const total = files.filter((f) => f.selected).length;
  console.log(
    chalk.green(`🎉 Success!`),
    `${total || 0} files created/updated.`
  );
  const updated = files.filter(
    (f) => f.selected && f.destination_path.includes('package.json')
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
