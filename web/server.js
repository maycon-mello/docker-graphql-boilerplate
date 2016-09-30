import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const APP_PORT = 8000;
const GRAPHQL_PORT = 3000;
// Serve the Relay app
const compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      }
    ]
  },
  output: {filename: '/app.js', path: '/', publicPath: '/js/'}
});
let appServer = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: {colors: true}
});
// Serve static resources
appServer.use('/', express.static(path.resolve(__dirname, 'public')));
appServer.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
