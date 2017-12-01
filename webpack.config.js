module.exports = {
    entry: './src/tutorial.jsx',
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
  