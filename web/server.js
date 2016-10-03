import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import http from 'http';
import fs from 'fs';

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
  proxy: {'/graphql': `http://graphql:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: false,
});

function startServer() {
  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'public')));
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
  });
}

function writeSchema(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("./build/schema.json", data, 'UTF-8', (err) => {
      if (err) reject(err);
      console.log('Schema update');
      resolve();
    });
  });
}

function fetchSchema() {
  let options = {
    hostname: 'graphql',
    path: '/schema.json',
    port: GRAPHQL_PORT,
  };

  return new Promise((resolve, reject) => {
    http.request(options, (res) => {
      var data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).end();
  });
}

fetchSchema()
  .then(writeSchema)
  .then(startServer);
