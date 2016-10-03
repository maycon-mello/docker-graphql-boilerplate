import { GraphQLObjectType } from 'graphql';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

export default MutationType;
