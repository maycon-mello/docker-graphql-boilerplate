import { GraphQLSchema } from 'graphql';

import { QueryType } from './types';
import { MutationType } from './mutations';

export const Schema = new GraphQLSchema({
  query: QueryType,
  //mutation: MutationType,
});
