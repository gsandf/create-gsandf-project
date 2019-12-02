import { GraphQLScalarType, Kind } from 'graphql';
import { DateTimeType } from '.';

test('exports a custom GraphQL scalar', () => {
  expect(DateTimeType).toBeInstanceOf(GraphQLScalarType);
  expect(DateTimeType.name).toBe('DateTime');
});

test('serializes dates to date strings', () => {
  expect(DateTimeType.serialize(new Date('2018-03-01T00:00:00Z'))).toBe(
    '2018-03-01T00:00:00.000Z'
  );
});

test('date strings to date strings', () => {
  expect(DateTimeType.serialize('1234-12-12')).toBe('1234-12-12T00:00:00.000Z');
});

test('serializes timestamp numbers as date string', () => {
  expect(DateTimeType.serialize(new Date(1519884000000))).toBe(
    '2018-03-01T06:00:00.000Z'
  );
});

test('throws when serializing an invalid date', () => {
  expect(() => DateTimeType.serialize('abc')).toThrow(TypeError);
});

test('parseLiteral deserializes date strings to date', () => {
  const ast = { kind: Kind.STRING, value: '1900-01-05' };
  expect(DateTimeType.parseLiteral(ast)).toEqual(new Date('1900-01-05'));
});

test('parseValue deserializes date strings to date', () => {
  expect(DateTimeType.parseValue('2019-01-01')).toEqual(new Date('2019-01-01'));
  expect(DateTimeType.parseValue('2020-01-02T12:34:56.789Z')).toEqual(
    new Date('2020-01-02T12:34:56.789Z')
  );
});

test('parseLiteral deserializes timestamp number to date', () => {
  const ast = { kind: Kind.INT, value: 1574363683121 };
  expect(DateTimeType.parseLiteral(ast)).toEqual(
    new Date('2019-11-21T19:14:43.121Z')
  );
});

test('parseValue deserializes timestamp number to date', () => {
  expect(DateTimeType.parseValue(1574363683121)).toEqual(
    new Date('2019-11-21T19:14:43.121Z')
  );
});

test('throws when deserializing an invalid date', () => {
  expect(() => DateTimeType.parseLiteral('laksdjf')).toThrow(TypeError);
  expect(() => DateTimeType.parseValue('laksdjf')).toThrow(TypeError);
});
