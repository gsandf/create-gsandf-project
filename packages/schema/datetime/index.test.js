import test from 'ava';
import { GraphQLScalarType, Kind } from 'graphql';
import { DateTimeType } from '.';

test('exports a custom GraphQL scalar', t => {
  t.true(DateTimeType instanceof GraphQLScalarType);
  t.is(DateTimeType.name, 'DateTime');
});

test('serializes dates to date strings', t => {
  t.is(
    DateTimeType.serialize(new Date('2018-03-01T00:00:00Z')),
    '2018-03-01T00:00:00.000Z'
  );
});

test('date strings to date strings', t => {
  t.is(DateTimeType.serialize('1234-12-12'), '1234-12-12T00:00:00.000Z');
});

test('serializes timestamp numbers as date string', t => {
  t.is(
    DateTimeType.serialize(new Date(1519884000000)),
    '2018-03-01T06:00:00.000Z'
  );
});

test('throws when serializing an invalid date', t => {
  t.throws(() => DateTimeType.serialize('abc'), { instanceOf: TypeError });
});

test('parseLiteral deserializes date strings to date', t => {
  const ast = { kind: Kind.STRING, value: '1900-01-05' };
  t.deepEqual(DateTimeType.parseLiteral(ast, null), new Date('1900-01-05'));
});

test('parseValue deserializes date strings to date', t => {
  t.deepEqual(DateTimeType.parseValue('2019-01-01'), new Date('2019-01-01'));

  t.deepEqual(
    DateTimeType.parseValue('2020-01-02T12:34:56.789Z'),
    new Date('2020-01-02T12:34:56.789Z')
  );
});

test('parseLiteral deserializes timestamp number to date', t => {
  const ast = { kind: Kind.INT, value: 1574363683121 };
  t.deepEqual(
    DateTimeType.parseLiteral(ast, null),
    new Date('2019-11-21T19:14:43.121Z')
  );
});

test('parseValue deserializes timestamp number to date', t => {
  t.deepEqual(
    DateTimeType.parseValue(1574363683121),
    new Date('2019-11-21T19:14:43.121Z')
  );
});

test('throws when deserializing an invalid date', t => {
  t.throws(() => DateTimeType.parseLiteral('laksdjf', null), {
    instanceOf: TypeError
  });
  t.throws(() => DateTimeType.parseValue('laksdjf'), { instanceOf: TypeError });
});
