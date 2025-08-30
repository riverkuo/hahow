import { fetcher } from './fetcher';

export function queryFunction<TResponse, TParams>(endpoint: string, params?: TParams) {
  return () => fetcher<TResponse>('get', endpoint, undefined, params);
}

export function mutationFunction<TResponse, TRequest>(endpoint: string, method: 'post' | 'patch', data?: TRequest) {
  return () => fetcher<TResponse>(method, endpoint, data);
}
