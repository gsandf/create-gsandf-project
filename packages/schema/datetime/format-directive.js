import { format, parseISO } from 'date-fns';
import { defaultFieldResolver, GraphQLString } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { serialize } from './parser';

const formatDate = (date, formatString) => format(parseISO(date), formatString);

class FormattableDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx" } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString
    });

    field.resolve = async function(
      source,
      { format, ...otherArgs },
      context,
      info
    ) {
      const value = await resolve.call(this, source, otherArgs, context, info);

      const date = serialize(value);

      // If a format argument was not provided, default to the optional
      // defaultFormat argument taken by the @date directive:
      return formatDate(date, format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}

export { FormattableDateDirective };
