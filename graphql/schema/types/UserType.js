import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionFromArray, connectionArgs } from 'graphql-relay';

import { nodeInterface, registerModelType } from '../NodeDefinitions';
import { User, getUser, getWidgets } from '../database';
import { WidgetConnection } from './WidgetType';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    widgets: {
      type: WidgetConnection,
      description: 'A person\'s collection of widgets',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getWidgets(), args),
    },
  }),
  interfaces: [nodeInterface],
});

registerModelType({
  name: 'User',
  type: UserType,
  modelType: User,
  fetchById: (id) => getUser(id),
});

export default UserType;
