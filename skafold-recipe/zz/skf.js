const { argv } = require('yargs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');

console.log('ARGV', argv);

async function gist() {
  const packageJson = fs.readFileSync(path.join(__dirname, 'package.json'));
  const overrides = fs.readFileSync(
    path.join(__dirname, 'gist', 'package.json')
  );
  const lintFile = fs.readFileSync(
    path.join(__dirname, 'gist', '.eslintrc.js')
  );

  try {
    const lintModule = require('./gist/.eslintrc.js');
    console.log('LINTMODULE', lintModule);
  } catch (e) {
    console.log('FUBAR');
  }

  const pkg = JSON.parse(packageJson);
  const ovr = JSON.parse(overrides);
  console.log(merge(ovr, pkg));
  await fs.mkdir(path.join(__dirname, 'sample'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'sample', '.eslintrc.js'), lintFile);
  // const res = await axios({
  //   method: 'get',
  //   url: `https://api.github.com/users/radenkovic/gists`,
  //   headers: {
  //     "Accept": "application/vnd.github.v3+json"
  //   }
  // })
}

gist();

// MORE
