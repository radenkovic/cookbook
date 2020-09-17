const simpleGit = require('simple-git');
const rimraf = require('rimraf');
const ora = require('ora');

const git = simpleGit();

module.exports = async function gitHandler(url, store) {
  if (!url) throw new Error('url is required for git handler');
  // Parse URL
  if (!url.startsWith('git') && !url.startsWith('http')) {
    // set default to github
    url = `git@github.com:${url}.git`;
  }
  // Check Status
  const { files } = await git.status();
  if (files && files.length) {
    // TODO: prompt
    console.log('Prompt: Do you want to continue');
  }

  const dir = store.get('recipeDir');

  // Clean the dir
  const spinner = ora(`Cleaning up old recipes...`).start();
  rimraf.sync(dir);

  // Clone
  spinner.text = 'Downloading recipe...';
  await git.clone(url, dir);
  spinner.stop();

  // Call Done
  store.dispatch('git-done', dir);
};
