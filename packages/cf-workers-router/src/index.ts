// Adapted from https://github.com/cloudflare/worker-template-router

type Condition = (request: Request) => Boolean;
type Handler = (request: Request) => Response | Promise<Response>;
type RegExpMatcher = string | RegExp;

/**
 * Helper functions that when passed a request will return a
 * boolean indicating if the request uses that HTTP method,
 * header, host or referrer.
 */
export const Method = (method: string): Condition => (request: Request) =>
  request.method.toLowerCase() === method.toLowerCase();
export const Connect = Method("connect");
export const Delete = Method("delete");
export const Get = Method("get");
export const Head = Method("head");
export const Options = Method("options");
export const Patch = Method("patch");
export const Post = Method("post");
export const Put = Method("put");
export const Trace = Method("trace");

export const Header = (header: string, value: string) => (request: Request) =>
  request.headers.get(header) === value;

export const Path = (regExp: RegExpMatcher): Condition => (
  request: Request
) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const match = path.match(regExp) || [];
  return match[0] === path;
};

type Route = {
  conditions: Condition[] | Condition;
  handler: Handler;
};

/**
 * The Router handles determines which handler is matched given the
 * conditions present for each request.
 */
export class Router {
  routes: Route[] = [];

  handle(conditions: Condition[] | Condition, handler: Handler) {
    this.routes.push({
      conditions,
      handler,
    });
    return this;
  }

  connect(url: RegExpMatcher, handler: Handler) {
    return this.handle([Connect, Path(url)], handler);
  }

  delete(url: RegExpMatcher, handler: Handler) {
    return this.handle([Delete, Path(url)], handler);
  }

  get(url: RegExpMatcher, handler: Handler) {
    return this.handle([Get, Path(url)], handler);
  }

  head(url: RegExpMatcher, handler: Handler) {
    return this.handle([Head, Path(url)], handler);
  }

  options(url: RegExpMatcher, handler: Handler) {
    return this.handle([Options, Path(url)], handler);
  }

  patch(url: RegExpMatcher, handler: Handler) {
    return this.handle([Patch, Path(url)], handler);
  }

  post(url: RegExpMatcher, handler: Handler) {
    return this.handle([Post, Path(url)], handler);
  }

  put(url: RegExpMatcher, handler: Handler) {
    return this.handle([Put, Path(url)], handler);
  }

  trace(url: RegExpMatcher, handler: Handler) {
    return this.handle([Trace, Path(url)], handler);
  }

  all(handler: Handler) {
    return this.handle([], handler);
  }

  route(request: Request) {
    const route = this.resolve(request);

    if (route) {
      return route.handler(request);
    }

    return new Response(null, {
      status: 404,
    });
  }

  /**
   * resolve returns the matching route for a request that returns
   * true for all conditions (if any).
   */
  resolve(request: Request) {
    return this.routes.find((route) => {
      if (
        !route.conditions ||
        (Array.isArray(route) && !route.conditions.length)
      ) {
        return true;
      }

      if (typeof route.conditions === "function") {
        return route.conditions(request);
      }

      return route.conditions.every((condition) => condition(request));
    });
  }
}
