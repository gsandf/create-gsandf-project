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
const wordPressURL = new URL(wordPressOptions.baseURL);

app.prepare().then(() => {
  server.start(graphqlOptions, ({ playground, port }) => {
    console.log(` > Site @ http://localhost:${port}/`);
    console.log(` > Playground @ http://localhost:${port}${playground}`);
    console.log(
      ` > WordPress @ ${wordPressURL.protocol}//${wordPressURL.host}/`
    );
  });

  // Redirect requests for WordPress to the WordPress server
  server.express.use('/wp-*', (req, res) => {
    // This should be caught by Nginx in production-like environments
    res.redirect(
      `${wordPressURL.protocol}//${wordPressURL.host}${req.originalUrl}`
    );
  });

  server.express.use((req, res) => nextHandler(req, res));
});
