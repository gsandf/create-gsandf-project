# WordPress + Next.js Starter

> React you a WordPress for much good

Server-rendered, code-split React applications can be tough. Connecting them to a
properly built WordPress setup is even tougher.

This is an attempt to consolidate our best work and let future projects gain
from improvements over time.

**What's included:**

- :atom_symbol: A full React.js site with server-side rendering and
  code-splitting
- :green_heart: [ESLint], [Prettier], and other configs are set up and ready to
  go or be modified
- :wavy_dash: A WordPress theme that turns the CMS into a headless CMS
- :whale: Docker images for quick local development
- :lock: Controlled WordPress plugins so you always have the right version and
  the right things activated

## How to Use

This is an example repository that is ready to be set up. With [Yarn] installed,
run:

```bash
yarn create gsandf-project --example wordpress-next new-site-name
```

This creates a new project in the current directory called `new-site-name`.

## Getting Started

[Node.js] and [Yarn] are required to work with this project. [Docker] is
required to run the WordPress + database server locally.

To install all dependencies and build the Docker images, run:

```bash
yarn bootstrap
```

Then, start the server using one of the predefined start scripts:

```bash
# Run using the development server (recommended for most development)
# Also available as `yarn start`
yarn start:dev

# Run using a local Docker container (recommended when testing database changes)
yarn start:local
```

See below for other scripts.

### Useful Commands

|                    |                                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| `yarn bootstrap`   | Installs all dependencies and builds docker images                       |
| `yarn down`        | Stop and remove running Docker images                                    |
| `yarn start`       | Same as `yarn start:dev`                                                 |
| `yarn start:local` | Runs the project and a local Docker container for WordPress + a database |
| `yarn start:dev`   | Runs the project using the development server                            |
| `yarn start:stage` | Runs the project using the staging server                                |
| `yarn start:prod`  | Runs the project using the production server                             |

### Content Updates

We typically use [wp-migrate-db] for moving content between environments.

### Extending the GraphQL Schema

This uses [`create-root-schema`]. This means the schema can be written in many
files and combined. New schema parts should be written in
`packages/site/schema/`. Normally each file will export `typeDefs` and
`resolvers`, but more can be done (see the README for [`create-root-schema`] for
more details).

After creating a new schema part, it should be included in `packages/site/schema/index.js`.

For an example on how to extend the schema, see `packages/site/schema/status.ts`
and `packages/site/schema/index.js`.

### Managing Plugins

This setup uses [WP-CLI] and Bitbucket Pipelines to manage the plugins across
environments.

The list of plugins that will be setup are found in `plugins.json`.

You can update the list in your project by modifying the plugins on a WordPress
server through the admin panel. Then, backup the plugin settings using WP-CLI:

```bash
wp plugin-list backup --ssh=example.com > plugins.json
```

A template `wp-cli.yml` has been provided. If you fill it out, you can also
backup plugins without the `--ssh` flag:

```bash
wp @production plugin-list backup > plugins.json
```

## See Also

For more of a deep dive, see the docs for the projects this one depends on:

- [GraphQL Yoga] - sets up a GraphQL/Express server
- [Next.js] - handles server-side rendering and routing

## License

UNLICENSED

[`create-root-schema`]: https://github.com/gsandf/create-root-schema
[docker]: https://www.docker.com/
[eslint]: https://eslint.org/
[graphql yoga]: https://github.com/prisma-labs/graphql-yoga
[next.js]: https://nextjs.org/
[node.js]: https://nodejs.org/
[prettier]: https://prettier.io/
[wp-cli]: https://wp-cli.org/
[wp-migrate-db]: https://wordpress.org/plugins/wp-migrate-db/
[yarn]: https://yarnpkg.com/en/docs/
