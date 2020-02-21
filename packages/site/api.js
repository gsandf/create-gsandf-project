import axios from 'axios';

const graphqlEndpoint =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export const apiRequest = axios.create({
  baseURL: graphqlEndpoint,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

/**
 * @typedef {object} GraphQLQuery
 * @property {string} query - GraphQL query
 * @property {any} variables - GraphQL query variables
 *
 * @typedef {Promise<{ data: any, errors: any }>} GraphQLResponse
 */

/**
 * Fetch data from the GraphQL service
 * @param {GraphQLQuery} arguments
 * @return {GraphQLResponse} [return description]
 */
export async function apiFetch({ query, variables }) {
  return apiRequest({
    data: { query, variables },
    method: 'POST'
  }).then(response => response.data);
}
