const simpleGit = require('simple-git');
const git = simpleGit();
const path = require('path');

module.exports = () => {
  git.status().then((status) => {
    if (status && status.files.length) {
      console.log('Commit before proceeding');
    }
  });
  git.clone(
    'git@github.com:radenkovic/krang.git',
    path.join(process.cwd(), 'skafold-recipe-git')
  );
};
