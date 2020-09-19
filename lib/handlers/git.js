const git = require('../utils/git-client');
const rimraf = require('rimraf');
const ora = require('ora');
const path = require('path');

module.exports = async function gitHandler(
  { url, recipePath = '' },
  store,
  done
) {
  if (!url) return done(new Error('url is required for git handler'));
  // Parse URL
  if (!url.startsWith('git@') && !url.startsWith('http')) {
    // set default to github
    url = `git@github.com:${url}.git`;
  }

  const dir = store.get('defaultRecipeDir');
  const spinner = ora(`Cleaning up old recipes...`).start();

  // Clean the dir
  try {
    rimraf.sync(dir);
  } catch (e) {
    done(e.message);
  }

  // Clone
  spinner.text = 'Downloading recipe from' + url;
  try {
    await git.clone(url, dir);
    spinner.stop();
    return done(null, path.join(dir, recipePath));
  } catch (e) {
    spinner.stop();
    return done(e);
  }
};
