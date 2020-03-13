# Headless WordPress Starter

> React you a WordPress for much good

Server-side, code-split React applications can be tough. Connecting them to a
properly built WordPress setup is even tougher.

This is an attempt to consolidate our best work and let future projects gain
from improvements over time.

**What's included:**

- :green_heart: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/),
  and [Jest](https://jestjs.io/) are set up and ready to go (or be modified
  however you want)
- :atom_symbol: React with server-side rendering and code-splitting
- :wavy_dash: A WordPress theme that turns the CMS into a headless CMS
- :whale: Docker images for quick local development

## Quick Start

With [Yarn](https://yarnpkg.com/en/docs/) installed, run:

```bash
# Clone the repo
git clone https://bitbucket.org/gsf-interactive/headless-wordpress-starter

# Run the setup command
yarn bootstrap
```

## Useful Commands

|                  |                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------ |
| `yarn bootstrap` | Installs all dependencies and builds docker images                                   |
| `yarn dev`       | Runs the project locally in development mode                                         |
| `rs`             | While the project is running, you can type `rs` into the terminal to quickly restart |

## See Also

For more of a deep dive, see the docs for the projects this one depends on:

- [GraphQL Yoga](https://github.com/prisma-labs/graphql-yoga) - sets up a GraphQL/Express server
- [Razzle](https://github.com/jaredpalmer/razzle) - React SSR

## License

UNLICENSED
