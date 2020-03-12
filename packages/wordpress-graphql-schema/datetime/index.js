import { GraphQLScalarType } from 'graphql';
import { FormattableDateDirective } from './format-directive';
import { coerceToDate, serialize } from './parser';

export const DateTimeType = new GraphQLScalarType({
  description: 'Date time type',
  name: 'DateTime',
  parseLiteral: ({ value }) => coerceToDate(value),
  parseValue: coerceToDate,
  serialize
});

export const resolvers = {
  DateTime: DateTimeType
};

export const schemaDirectives = {
  formatDate: FormattableDateDirective
};

export const typeDefs = /* GraphQL */ `
  directive @formatDate(defaultFormat: String) on FIELD_DEFINITION

  scalar DateTime
`;
