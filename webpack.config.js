module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ["transform-react-jsx"]
        }
      }]
    }
  }
  