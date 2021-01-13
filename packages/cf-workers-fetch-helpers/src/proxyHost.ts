type ProxyHostOptions = {
  host: string;
};

export const proxyHost = (
  prevFetch: typeof fetch,
  options: ProxyHostOptions
): typeof fetch => (...args) => {
  const request = new Request(...args);
  const url = new URL(request.url);
  url.host = options.host;

  return prevFetch(new Request(url.toString(), request));
};
