# Next.js Starter

> A small layer on top of Next.js for fast hacking

This is meant as a base for any website built with React and Styled Components,
including:

- quick prototypes
- static generated sites (handled using Next.js)
- sites with API (using Next.js API routes)
- …and more!

If you're planning on using WordPress, see the [wordpress-next] starter.

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

- [Next.js] - the framework handling server-side rendering and routing

## License

UNLICENSED

[next.js]: https://nextjs.org/
[node.js]: https://nodejs.org/
[prettier]: https://prettier.io/
[wordpress-next]: https://github.com/gsandf/create-gsandf-project/tree/master/examples/wordpress-next
[yarn]: https://yarnpkg.com/en/docs/
