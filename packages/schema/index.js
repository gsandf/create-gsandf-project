import createRootSchema from './create-root-schema';
import * as dateTimeType from './datetime';
import * as filterableTypes from './filterable-types';
import * as status from './status';
import * as wordpress from './wordpress';

const { resolvers, schemaDirectives, typeDefs } = createRootSchema([
  dateTimeType,
  filterableTypes,
  status,
  wordpress
]);

export { resolvers, schemaDirectives, typeDefs };
