const fs = require('fs/promises');
const path = require('path');
const axios = require('axios').default;

async function getPageList(directory, rootDirectory = directory) {
  const fileList = await fs.readdir(directory, { withFileTypes: true });

  return Promise.all(
    fileList.map(p =>
      p.isDirectory()
        ? getPageList(path.join(directory, p.name), rootDirectory)
        : path.join(
            path.relative(rootDirectory, directory),
            path.basename(p.name, '.tsx')
          )
    )
  ).then(files =>
    files
      .flat()
      // don't return files:
      // - starting with `_` at the root (e.g._document.js)
      // - custom 404 response
      // - files in `api/`
      // - files including [] (e.g. /pages/[pageID].js)
      .filter(p => !/^(_|404|api\/)|\[/.test(p))
      // `/index` will be `/`
      .map(x => x.replace(/\/?index$/, ''))
  );
}

async function main() {
  const baseUrl = process.env.WORDPRESS_URL;

  if (!baseUrl) {
    throw new Error(
      'the `WORDPRESS_URL` environment variable should be set to a URL to pre-load pages for'
    );
  }

  const pageDirectory = path.join(__dirname, '../packages/site/pages');
  const pages = await getPageList(pageDirectory);
  const urls = pages.map(p => `${baseUrl}/${p}`);

  await Promise.all(
    urls.map(u =>
      axios
        .get(u)
        .then(res => console.log(`[ ${res.statusText} ] ${res.config.url}`))
        .catch(res => {
          console.error(`[ ${res.response.statusText} ] ${res.config.url}`);
        })
    )
  );
}

main();
