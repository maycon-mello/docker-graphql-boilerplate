var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../../graphql/schema/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
