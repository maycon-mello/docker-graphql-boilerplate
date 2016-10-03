import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import {clean} from 'require-clean';
import {exec} from 'child_process';

const app = express();
const GRAPHQL_PORT = 3000;

clean('./schema');
require('./scripts/updateSchema');
const { Schema } = require('./schema');

/**
 * Exposes schema.json to
 * This file is needed to transpile relay code outside this container
 *
 */
app.get('/schema.json', (req, res) => res.sendFile(__dirname + '/build/schema.json'));

app.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));

const graphQLServer = app.listen(GRAPHQL_PORT, () => {
  console.log(
    `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
  );
});
