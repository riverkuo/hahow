import { fetcher } from './fetcher';

export async function queryFunction<TParams, TResponse>(endpoint: string, params: TParams) {
  return await fetcher<TResponse>('get', endpoint, undefined, params);
}

export async function mutationFunction<TRequest, TResponse>(endpoint: string, method: 'patch', data: TRequest) {
  return await fetcher<TResponse>(method, endpoint, data);
}
