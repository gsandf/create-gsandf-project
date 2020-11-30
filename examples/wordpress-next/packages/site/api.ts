import axios from 'axios';
import LRUMap from 'quick-lru';
import { absoluteURL } from './utils/absolute-url';

const graphqlEndpoint = absoluteURL('/graphql');

export const apiRequest = axios.create({
  baseURL: graphqlEndpoint,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export interface GraphQLQuery {
  query: string;
  variables?: any;
}

export interface GraphQLResponse {
  data?: any;
  errors?: any;
}

interface APIFetchArgs extends GraphQLQuery {
  bypassCache?: boolean;
  throwOnErrors?: boolean;
}

const cache = new LRUMap<string, GraphQLResponse>({ maxSize: 100 });

export const clearGraphQLCache = () => cache.clear();

export const getErrorMessage = (response: GraphQLResponse) =>
  response?.errors[0]?.message;

export const hasErrors = (response: GraphQLResponse) =>
  response.errors !== undefined;

export async function apiFetch({
  bypassCache = false,
  query,
  throwOnErrors = true,
  variables
}: APIFetchArgs): Promise<GraphQLResponse> {
  const key = JSON.stringify([query, variables]);

  // Fetch value if none stored in cache
  if (bypassCache || !cache.has(key)) {
    const value: GraphQLResponse = await apiRequest({
      data: { query, variables },
      method: 'POST'
    }).then(response => response.data);

    // If errors, return without caching
    if (hasErrors(value)) {
      if (throwOnErrors) throw new Error(getErrorMessage(value));
      return value;
    }

    // Save value in cache
    cache.set(key, value);
  }

  return cache.get(key) as GraphQLResponse;
}
