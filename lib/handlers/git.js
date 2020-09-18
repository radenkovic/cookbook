const git = require('../utils/git-client');
const rimraf = require('rimraf');
const ora = require('ora');
const path = require('path');

module.exports = async function gitHandler({ url, recipePath = '' }, store) {
  if (!url) throw new Error('url is required for git handler');
  // Parse URL
  if (!url.startsWith('git') && !url.startsWith('http')) {
    // set default to github
    url = `git@github.com:${url}.git`;
  }

  const dir = store.get('defaultRecipeDir');

  // Clean the dir
  const spinner = ora(`Cleaning up old recipes...`).start();
  rimraf.sync(dir);

  // Clone
  spinner.text = 'Downloading recipe...';
  await git.clone(url, dir);
  spinner.stop();

  // Call Done
  store.dispatch('git-done', path.join(dir, recipePath));
};
