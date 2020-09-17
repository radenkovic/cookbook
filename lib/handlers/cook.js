const ch = require('chalk');

module.exports = (payload, store) => {
  const recipe = store.collection('recipes').findOne();
  console.log('Ready for cooking', recipe.files);
};
