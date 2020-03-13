# WordPress + Next.js Starter

> React you a WordPress for much good

Server-side, code-split React applications can be tough. Connecting them to a
properly built WordPress setup is even tougher.

This is an attempt to consolidate our best work and let future projects gain
from improvements over time.

**What's included:**

- :atom_symbol: A full React.js site with server-side rendering and
  code-splitting
- :green_heart: [ESLint], [Prettier], and [Jest] are set up and ready to go (or
  be modified however you want)
- :wavy_dash: A WordPress theme that turns the CMS into a headless CMS
- :whale: Docker images for quick local development

## How to Use

With [Yarn] installed, run:

```bash
yarn create @gsandf/site --example wordpress-next new-site-name
```

## Useful Commands

|                  |                                                    |
| ---------------- | -------------------------------------------------- |
| `yarn bootstrap` | Installs all dependencies and builds docker images |
| `yarn dev`       | Runs the project in development mode               |
| `yarn start`     | Runs the project in production mode                |

## See Also

For more of a deep dive, see the docs for the projects this one depends on:

- [GraphQL Yoga] - sets up a GraphQL/Express server
- [Next.js] - handles server-side rendering and routing

## License

UNLICENSED

[eslint]: https://eslint.org/
[graphql yoga]: https://github.com/prisma-labs/graphql-yoga
[jest]: https://jestjs.io/
[next.js]: https://nextjs.org/
[prettier]: https://prettier.io/
[yarn]: https://yarnpkg.com/en/docs/
