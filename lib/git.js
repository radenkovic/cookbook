const simpleGit = require('simple-git');
const git = simpleGit();
const path = require('path');

const status = git.status().then((r) => {
  console.log(r);
});
git.clone(
  'https://gist.github.com/23256d53ec16956c4f3dbfe325bbfc3f.git',
  path.join(process.cwd(), 'skafold-recipe-git')
);
