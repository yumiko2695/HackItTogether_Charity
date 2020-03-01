//transpile new modern syntax to older syntax for older browsers

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './app/index.js', // assumes your entry point is the index.js in the root of your project folder
  mode: isDev ? 'development' : 'production',
  output: {
    path: __dirname, // assumes your bundle.js will also be in the root of your project folder
    filename: './public/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
