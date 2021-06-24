# Next.js Starter

> A small layer on top of Next.js for fast hacking

This is meant as a base for websites built with React and Styled Components, including:

- most stand-alone sites
- quick prototypes
- static generated sites (handled using Next.js)
- sites needing a simple API (using Next.js API routes)
- …and more!

It may be better to use a different project for some situations - see the [main readme] for options:

- projects embedded within a page on a site (e.g. using a script tag)
- sites heavily tied to a CMS
  - A CMS's API can be used (e.g. using API routes), but we're working on more robust projects that build on this one that are more oriented toward CMS-driven sites

## How to Use

This is an example repository that is ready to be set up. With [Yarn] installed,
run:

```bash
npx create-gsandf-project --example nextjs new-site-name
```

This creates a new project in the current directory called `new-site-name`.

## Getting Started

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

Then, start the local server to get started:

```bash
yarn dev
```

See below for other scripts.

### Useful Commands

|               |                                                   |
| ------------- | ------------------------------------------------- |
| `yarn build`  | Builds the project for production                 |
| `yarn dev`    | Starts the development server                     |
| `yarn format` | Format the source following the [Prettier] styles |
| `yarn start`  | Starts the project in production mode             |

## See Also

For more of a deep dive, see the docs for the projects this one depends on:

- [@gsandf/ui] - common components, hooks, theming, and other helpers
- [Next.js] - the framework handling server-side rendering and routing

## License

UNLICENSED

[@gsandf/ui]: https://github.com/gsandf/ui
[main readme]: https://github.com/gsandf/create-gsandf-project/tree/master
[next.js]: https://nextjs.org/
[node.js]: https://nodejs.org/
[prettier]: https://prettier.io/
[yarn]: https://yarnpkg.com/en/docs
