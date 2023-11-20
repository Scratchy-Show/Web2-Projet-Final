const path = require('path');

module.exports = {
  entry: {
		index : './client/src/js/page-index.js',
		chat : './client/src/js/page-chat.js',
		register : './client/src/js/page-register.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'client/dist'),
  },
};
