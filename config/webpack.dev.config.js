const path = require('path')

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, '..', 'dist')
  },

  devtool: 'source-map',

  devServer: {
    host: '0.0.0.0',
    port: 9000,
    hot: true,
    contentBase: './public',
    historyApiFallback: true
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
