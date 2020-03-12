import { GraphQLServer } from 'graphql-yoga';
import next from 'next';
import * as schema from '@gsandf/wordpress-graphql-schema';

const graphqlOptions = {
  endpoint: '/graphql',
  playground: '/graphql',
  port: process.env.PORT || 3000,
  subscriptions: '/graphql'
};

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const nextHandler = app.getRequestHandler();

const server = new GraphQLServer(schema);

server.start(graphqlOptions, ({ playground, port }) => {
  console.log(` > Site @ http://localhost:${port}/`);
  console.log(` > Playground @ http://localhost:${port}${playground}`);
});

app.prepare().then(() => {
  server.express.use((req, res) => nextHandler(req, res));
});
