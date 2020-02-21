import axios from 'axios';

const graphqlEndpoint =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export const apiRequest = axios.create({
  baseURL: graphqlEndpoint,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export interface GraphQLQuery {
  query: string;
  variables?: any;
}

export interface GraphQLResponse {
  data: any;
  errors: any;
}

export async function apiFetch({ query, variables }: GraphQLQuery) {
  return apiRequest({
    data: { query, variables },
    method: 'POST'
  }).then(response => response.data);
}
