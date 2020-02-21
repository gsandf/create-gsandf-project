import axios from 'axios';
import { compile } from 'path-to-regexp';

const wordpressEndpoint = process.env.WORDPRESS_API || 'http://localhost:8080';

export const request = axios.create({
  baseURL: `${wordpressEndpoint}/wp-json`,
  headers: { 'Content-Type': 'application/json' }
});

function formatPost(post) {
  return {
    ...post,
    ...post.acf,
    dateCreated: post.date,
    dateModified: post.modified,
    title: post.title.rendered
  };
}

/**
 * @typedef {{ urlParams? }} ExtraOptions
 * @typedef {import('axios').AxiosRequestConfig & ExtraOptions} WPFetchOptions
 */

/**
 * Fetch data from the WordPress API
 * @param {string} path - the path to fetch data from (e.g. `/wp/v2/posts`)
 * @param {WPFetchOptions} options - options to add to the request
 * @return {Promise<object|object[]>} the response from the WordPress API
 * @see https://github.com/axios/axios for more options
 */
export async function wpFetch(path, { urlParams, ...options } = {}) {
  const compiledPath = urlParams ? compile(path)(urlParams) : path;
  const response = await request(compiledPath, options);
  const { data } = response;

  return Array.isArray(data) ? data.map(formatPost) : formatPost(data);
}
