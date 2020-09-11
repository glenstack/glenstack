type AlterURLOptions =
  | {
      prepend?: string;
      append?: string;
    }
  | {
      mutate?: (url: string) => string;
    };

export const alterURL = (
  prevFetch: typeof fetch,
  options: AlterURLOptions
): typeof fetch => {
  let urlMutator = (prevURL: string) => prevURL;

  if ("mutate" in options) {
    urlMutator = options.mutate;
  } else if ("prepend" in options || "append" in options) {
    urlMutator = (prevURL: string) =>
      `${options.prepend || ""}${prevURL}${options.append || ""}`;
  }

  return (...args) => {
    let request = new Request(...args);
    const url = urlMutator(request.url);
    request = new Request(url, request);

    return prevFetch(request);
  };
};
