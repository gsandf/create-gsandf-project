import { createUncompiledSchema } from '@gsandf/wordpress-graphql-schema';
import { combineSchemaDefinitions } from 'create-root-schema';
import * as status from './status';

const wordPressOptions = {
  auth: { username: 'admin', password: 'admin' },
  baseURL: process.env.WORDPRESS_API || 'http://localhost:8080/wp-json'
};

const wordPressSchema = createUncompiledSchema(wordPressOptions);

export default combineSchemaDefinitions([status, wordPressSchema]);
