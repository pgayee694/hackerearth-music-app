export function isValidAuthResponse(
  response: any
): response is {
  access_token: string;
  expires_in: string;
  token_type: string;
  state: string;
} {
  return response != null && typeof response.access_token === 'string';
}
