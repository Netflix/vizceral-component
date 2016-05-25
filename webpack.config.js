module.exports = {
  entry: './src/vizceral-component.js',
  output: {
    filename: 'vizceral-component.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /\.html$/, loader: 'html' }
    ]
  }
};
