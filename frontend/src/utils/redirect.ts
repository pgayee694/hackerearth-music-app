type PrimitiveParam = string | number | boolean;

export function redirect(
  url: string,
  params: Record<string, PrimitiveParam | PrimitiveParam[]>
) {
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${key}=${
          Array.isArray(value)
            ? value.map(encodeURIComponent).join(',')
            : encodeURIComponent(String(value))
        }`
    )
    .join('&');

  window.location.href = `${url}?${paramString}`;
}
