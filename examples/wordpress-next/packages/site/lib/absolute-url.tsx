// Get base URL from config; remove any trailing slashes
const baseURL = (
  process.env.NEXT_PUBLIC_WORDPRESS_URL ??
  process.env.WORDPRESS_URL ??
  ''
).replace(/\/$/, '');

/**
 * Creates an absolute URL from a path
 */
export function absoluteURL(path: string): string {
  if (!baseURL) {
    throw new Error('Expected base URL to be set using environment variables');
  }

  // Add a leading slash if it doesn't exist
  const separator = path[0] === '/' ? '' : '/';

  return `${baseURL}${separator}${path}`;
}
