import axios from 'axios';

const graphqlEndpoint =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export const apiRequest = axios.create({
  baseURL: graphqlEndpoint,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export async function apiFetch({ query, variables }) {
  const { data } = await apiRequest({
    data: { query, variables },
    method: 'POST'
  });
  return data;
}
