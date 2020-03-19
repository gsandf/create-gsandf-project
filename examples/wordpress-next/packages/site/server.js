import { createSchema } from '@gsandf/wordpress-graphql-schema';
import { GraphQLServer } from 'graphql-yoga';
import next from 'next';

const graphqlOptions = {
  endpoint: '/graphql',
  playground: '/graphql',
  port: process.env.PORT || 3000,
  subscriptions: '/graphql'
};

const wordPressOptions = {
  auth: { username: 'admin', password: 'admin' },
  baseURL: process.env.WORDPRESS_API || 'http://localhost:8080/wp-json'
};

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const nextHandler = app.getRequestHandler();

const wordPressSchema = createSchema(wordPressOptions);

const server = new GraphQLServer({ ...wordPressSchema });

app.prepare().then(() => {
  server.start(graphqlOptions, ({ playground, port }) => {
    console.log(` > Site @ http://localhost:${port}/`);
    console.log(` > Playground @ http://localhost:${port}${playground}`);
  });

  server.express.use((req, res) => nextHandler(req, res));
});
