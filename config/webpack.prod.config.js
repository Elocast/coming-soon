const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  mode: 'production',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: 'https://elo-front-nyc1-01.nyc3.cdn.digitaloceanspaces.com/'
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
