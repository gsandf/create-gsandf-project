import axios from 'axios';
import { absoluteURL } from './lib/absolute-url';

export interface GraphQLQuery {
  query: string;
  variables?: Record<string, unknown>;
}

interface GraphQLError {
  message: string;
  extensions?: unknown;
  locations?: unknown;
  nodes?: unknown;
  originalError?: unknown;
  path?: unknown;
  positions?: unknown;
  source?: unknown;
}

export type GraphQLErrorResponse = { errors: GraphQLError[] };
export type GraphQLSuccessResponse<Data = unknown> = { data: Data };

export type GraphQLResponse<Data = unknown> =
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

export async function apiFetch<Data = unknown>({
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
