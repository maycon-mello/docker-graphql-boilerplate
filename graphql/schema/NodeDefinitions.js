import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

class TypeResolver {

  constructor() {
    this.type = '';
  }
  /**
   * @param {Number} id
   */
  resolve(id) {}
}

class IdFetcher {
  check() {}
    /**
     * @param {Object} obj
     */
  resolve(obj) {}
}

/**
 * @type Array<IdFetcher>
 */
let idFetchers = [];

/**
 * @type Array<TypeResolver>
 */
let typeResolvers = [];

/**
 * Fetch data with globalId
 *
 */
const fetchDataById = (globalId) => {
  const { type, id } = fromGlobalId(globalId);

  for (let fetcher of idFetchers) {
    if (type === fetcher.type) {
      return fetcher.resolve(id);
    }
  }
  return null;
};

/**
 *
 *
 */
const resolveType = (obj) => {
  for (let typeResolver of typeResolvers) {
    if (typeResolver.check(obj)) {
      return typeResolver.resolve(obj);
    }
  }
  return null;
};

/**
 *
 * @param {IdFetcher} idFetcher
 * @param {TypeResolver} typeResolver
 * @param {GraphQLObjectType} type
 */
export const registerType = ({ idFetcher, typeResolver, type }) => {
  idFetchers.push(idFetcher);
  typeResolvers.push(typeResolver);
  types.push(type);
};

/**
 * Register a model type
 *
 * @param {String} name - type name
 * @param {Object} type - to compare with globalId type
 * @param {Object} modelType - to resolve model object into GraphQLObjectType
 * @param {Function} fetchById - callback to fetch data with globalId
 *
 * Usage:
 *
 * registerModelType({
 *   name: 'Video',
 *   type: VideoType,
 *   modelType: Video,
 *   fetchById: (id) => getVideoById(id),
 * });
 *
 */
export const registerModelType = ({ name, type, modelType, fetchById }) => {
  idFetchers.push({
    type,
    resolve: fetchById,
  });

  typeResolvers.push({
    check: (obj) => obj instanceof modelType,
    resolve: () => type,
  });

  types.push(type);
};

/**
 *
 * @type {Array<GraphQLObjectType>}
 */
export const types = [];

export const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(fetchDataById, resolveType);
