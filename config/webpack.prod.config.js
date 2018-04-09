const path = require('path')

module.exports = {
  entry: './src/app.js',
  mode: 'production',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, '..', 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  }
}
