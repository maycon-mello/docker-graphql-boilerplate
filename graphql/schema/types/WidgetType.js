import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';

import { nodeInterface, registerModelType } from '../NodeDefinitions';
import { Widget, getWidget } from '../database';

const WidgetType = new GraphQLObjectType({
  name: 'Widget',
  description: 'A shiny widget',
  fields: () => ({
    id: globalIdField('Widget'),
    name: {
      type: GraphQLString,
      description: 'The name of the widget',
    },
  }),
  interfaces: [nodeInterface],
});

registerModelType({
  name: 'Widget',
  type: WidgetType,
  modelType: Widget,
  fetchById: (id) => getWidget(id),
});

const connection = connectionDefinitions({
  name: 'Widget',
  nodeType: WidgetType,
});

export const WidgetConnection = connection.connectionType;
export default WidgetType;
