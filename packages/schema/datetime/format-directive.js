import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { defaultFieldResolver, GraphQLBoolean, GraphQLString } from 'graphql';
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

    field.args.push({
      name: 'formatRelative',
      type: GraphQLBoolean
    });

    field.resolve = async function(
      source,
      { format, formatRelative, ...otherArgs },
      context,
      info
    ) {
      const value = await resolve.call(this, source, otherArgs, context, info);

      const date = serialize(value);

      if (formatRelative) {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
      }

      // If a format argument was not provided, default to the optional
      // defaultFormat argument taken by the @date directive:
      return formatDate(date, format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}

export { FormattableDateDirective };
