import * as config from '../config.json';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export function request<T = any>(
  url: string,
  options?: Parameters<typeof fetch>[1]
): Promise<T> {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? `${config.api.local}${url}`
      : `${config.api.prod}${url}`;

  return fetch(apiUrl, options).then((response) => response.json());
}
