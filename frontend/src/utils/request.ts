import * as config from '../config.json';

export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export type RequestOptions = Omit<
  NonNullable<Parameters<typeof fetch>[1]>,
  'body'
> & { body: Record<string, any> };

export function request<T = any>(
  url: string,
  options?: RequestOptions,
): Promise<T> {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? `${config.api.local}${url}`
      : `${config.api.prod}${url}`;

  return fetch(
    apiUrl,
    options
      ? ({
          ...options,
          ...(options.body !== undefined && {
            body: JSON.stringify(options.body),
          }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        } as any)
      : options,
  )
    .then((response) => response.json())
    .then((value) => value as T);
}
