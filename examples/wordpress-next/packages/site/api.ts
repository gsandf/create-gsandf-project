import axios from 'axios';
import { absoluteURL } from './utils/absolute-url';

const graphqlEndpoint = absoluteURL('/graphql');

/** Time (in seconds) to cache content. Note, this is not in milliseconds. */
export const defaultCacheTime = 600; // 10 minutes

export const apiRequest = axios.create({
  baseURL: graphqlEndpoint,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export interface GraphQLQuery {
  query: string;
  variables?: any;
}

export interface GraphQLResponse<Data = any> {
  data: Data;
  errors: any;
}

export async function apiFetch<Data = any>({
  query,
  variables
}: GraphQLQuery): Promise<GraphQLResponse<Data>> {
  return apiRequest({
    data: { query, variables },
    method: 'POST'
  }).then(response => response.data);
}
