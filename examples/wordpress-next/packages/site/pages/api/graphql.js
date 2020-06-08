import { createSchema } from '@gsandf/wordpress-graphql-schema';
import { ApolloServer } from 'apollo-server-micro';

const wordPressOptions = {
  auth: { username: 'admin', password: 'admin' },
  baseURL: process.env.WORDPRESS_API || 'http://localhost:8080/wp-json'
};

const wordPressSchema = createSchema(wordPressOptions);

const apolloServer = new ApolloServer({ schema: wordPressSchema });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
