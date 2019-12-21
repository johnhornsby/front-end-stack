/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, 'static'),
    compress: false,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    open: true,
    serveIndex: true,
    useLocalIp: true,
  },

  // this outputs source maps to the js folder
  devtool: 'source-map',

  mode: 'production',

  entry: {
    app: ['./app/app.ts'],
  },

  output: {
    path: path.resolve(__dirname, './dist/js/'),
    chunkFilename: '[name].js',
    filename: '[name].js',
    publicPath: '/dist/js/',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './app')],
        exclude: /node_modules/,
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // modules: ["app", "node_modules"],
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDom',
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     __DEVELOPMENT__: false,
  //     __CLIENT__: true,
  //     __SERVER__: false,
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production'),
  //     },
  //   }),
  // ],
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true,
  //     }),
  //   ],
  // },
};
