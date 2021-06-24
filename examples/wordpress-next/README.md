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

## When to Use

This is meant as a base for a WordPress site with a Next.js-powered React front-end. This isn't just a theme, it's a separate front-end project, too.

If you'd prefer the WordPress installation be separate, consider the [Next.js starter](https://github.com/gsandf/create-gsandf-project/tree/master/examples/nextjs).

If you're using a different CMS or not using a CMS at all, see the [main readme] for other options.

## How to Use

This is an example repository that is ready to be set up. With [Yarn] installed,
run:

```bash
npx create-gsandf-project --example wordpress-next new-site-name
```

This creates a new project in the current directory called `new-site-name`.

## Getting Started

[Node.js] and [Yarn] are required to work with this project.

First install project dependencies:

```bash
yarn install
```

Start the server using one of the predefined start scripts. For example:

```bash
yarn start
```

See below for other scripts and ways to run against different environments.

### Useful Commands

|                    |                                                                        |
| ------------------ | ---------------------------------------------------------------------- |
| `yarn install`     | Installs all dependencies                                              |
| `yarn start:dev`   | Runs the project locally using remote data from the development server |
| `yarn start`       | Same as `yarn start:dev`                                               |
| `yarn dev`         | Same as `yarn start:dev`                                               |
| `yarn start:stage` | Runs the project locally using remote data from the staging server     |
| `yarn start:prod`  | Runs the project locally using remote data from the production server  |
| `yarn validate`    | Runs linting, type checks, tests, etc.                                 |

### Content Updates

We typically use the [wp sync db] for moving content between environments.

## See Also

For more of a deep dive, see the docs for the projects this one depends on:

- [@gsandf/ui] - common components, hooks, theming, and other helpers
- [Next.js] - handles server-side rendering and routing
- [WPGraphQL] - GraphQL API for WordPress

## License

UNLICENSED

[@gsandf/ui]: https://github.com/gsandf/ui
[eslint]: https://eslint.org/
[main readme]: https://github.com/gsandf/create-gsandf-project/tree/master
[next.js]: https://nextjs.org/
[node.js]: https://nodejs.org/
[prettier]: https://prettier.io/
[wp sync db]: https://github.com/wp-sync-db/wp-sync-db
[wpgraphql]: https://www.wpgraphql.com/
[yarn]: https://yarnpkg.com/en/docs/
