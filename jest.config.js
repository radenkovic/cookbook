const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  setupFiles: ['./test/setupTests.js'],
};
