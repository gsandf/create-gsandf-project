import { merge } from 'unchanged';

function extendIfExists(obj, part) {
  return part ? merge(null, obj, part) : obj;
}

function mergeSchemaPart(schema, part) {
  return {
    // deeply merge the resolver with the rest of the schema
    resolvers: extendIfExists(schema.resolvers, part.resolvers),
    // deeply merge the schemaDirectives
    schemaDirectives: extendIfExists(
      schema.schemaDirectives,
      part.schemaDirectives
    ),
    // append type definitions to existing type definitions
    typeDefs: part.typeDefs
      ? schema.typeDefs.concat(part.typeDefs)
      : schema.typeDefs
  };
}

function createRootSchema(schemas) {
  // Query and Mutation must be non-empty, even if they will be extended
  const rootTypes = /* GraphQL */ `
    type Mutation {
      _bootstrap_: String
    }
    type Query {
      _bootstrap_: String
    }
  `;

  // Combine types and resolvers into an object usable by `makeExecutableSchema`
  return schemas.reduce(mergeSchemaPart, {
    resolvers: {},
    schemaDirectives: {},
    typeDefs: [rootTypes]
  });
}

export default createRootSchema;
