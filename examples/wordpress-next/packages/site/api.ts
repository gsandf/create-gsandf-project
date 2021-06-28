import axios from 'axios';
import { absoluteURL } from './lib/absolute-url';

export interface GraphQLQuery {
  query: string;
  variables?: any;
}

interface GraphQLError {
  message: string;
  extensions?: any;
  locations?: any;
  nodes?: any;
  originalError?: any;
  path?: any;
  positions?: any;
  source?: any;
}

export type GraphQLErrorResponse = { errors: GraphQLError[] };
export type GraphQLSuccessResponse<Data = any> = { data: Data };

export type GraphQLResponse<Data = any> =
  | GraphQLErrorResponse
  | GraphQLSuccessResponse<Data>;

const graphqlEndpoint = absoluteURL('/graphql');

/** Time (in seconds) to cache content. Note, this is not in milliseconds. */
export const defaultCacheTime = 600; // 10 minutes

export const apiRequest = axios.create({
  baseURL: graphqlEndpoint,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export const getErrorMessage = (response: GraphQLErrorResponse): string =>
  response?.errors?.[0]?.message ?? 'An unknown error occured';

export const hasErrors = (
  response: GraphQLResponse
): response is GraphQLErrorResponse =>
  'errors' in response && response.errors !== undefined;

export async function apiFetch<Data = any>({
  query,
  variables
}: GraphQLQuery): Promise<GraphQLSuccessResponse<Data>> {
  const response = await apiRequest
    .request<GraphQLResponse<Data>>({
      data: { query, variables },
      method: 'POST'
    })
    .then(response => response.data);

  if (hasErrors(response)) {
    throw new Error(getErrorMessage(response));
  }

  return response;
}
