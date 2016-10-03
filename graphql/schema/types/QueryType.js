import {
  GraphQLObjectType,
} from 'graphql';

import { nodeField } from '../NodeDefinitions';
import UserType from './UserType';

import {
  // Import methods that your schema can use to interact with your database
  User,
  Widget,
  getUser,
  getViewer,
  getWidget,
  getWidgets,
} from '../database';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: UserType,
      resolve: () => getViewer(),
    },
  }),
});

export default QueryType;
