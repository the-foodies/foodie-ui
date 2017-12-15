const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  entry: ['babel-polyfill', path.resolve(__dirname, './src/index.jsx')],
  node: {
    fs: 'empty',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.min.js',
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-module-source-map',
};

webpackConfig.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { presets: ['es2015', 'stage-0', 'react'] },
});

webpackConfig.module.loaders.push({
  test: /\.(css)$/,
  loaders: ['style-loader', 'css-loader?url=false'],
});

webpackConfig.module.loaders.push({
  test: /\.(png|jpg|gif|jpeg)$/,
  loader: 'file-loader',
  options: {},
});

module.exports = webpackConfig;
