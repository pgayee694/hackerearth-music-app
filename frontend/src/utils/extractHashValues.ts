export function extractHashValues<
  T extends Record<string, string> = Record<string, string>
>(hash: string): T {
  return hash
    .substring(1)
    .split('&')
    .map((hashPart) => hashPart.split('='))
    .reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: value,
      }),
      {} as T
    );
}
