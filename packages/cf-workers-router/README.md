# Cloudflare Workers Router

A router for Cloudflare Workers.

Adapted from the official [`worker-template-router`](https://github.com/cloudflare/worker-template-router), but written in TypeScript, and [available for installation from npm](#installation).

## Installation

```sh
npm install --save @glenstack/cf-workers-router
```

## Usage

```typescript
import { Router, Method, Header, Path } from "@glenstack/cf-workers-router";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const router = new Router();
router.handle(
  [
    Method("CustomHTTPVerb"),
    Header("Authorization", "aPassword"),
    Path("/secrets"),
  ],
  (request) => new Response("Secrets unlocked!")
);
router.get("/index.html", () => new Response("<html></html>"));
router.post(/\/api\/.*/, (request) => fetch(request));

const handleRequest = (request: Request) => {
  const response = await router.route(request);
  return response;
};
```

`Router` is initialized with no parameters. It returns an instance of the Router class, which has the following methods:

- `handle` which takes two parameters:

  1. A single, or a list of, function(s) which take a request and return a boolean (true if the request should be handled by this handler, false if not).

     The following helper functions are also available to aid the construction of these condition functions. Each return a function which can be used for this parameter.

     - `Method` takes a single parameter, a string for the method name.
     - `Header` takes two parameters, the header name (a string), and the header value (a string).
     - `Path` takes a single parameter, a string or RegExp which is used to match against the pathname of the request.

  1. A function which takes a Request and returns a Response or a Promise of a Response.

- `route` which takes a single parameter, a Request to route. It returns a Response or a Promise of a Response. Requests are delegated to routes in the order the routes were registered (i.e. the first registered handler has priority). By default, if no handlers match a Request, a 404 Response is returned.

- A `Router` instance also has the following helper methods to match on a HTTP verb and URL pathname, which take two parameters (a string or RegExp which the Request's pathname is tested against, and, like `handle`, a function which takes a Request and returns a Response or a Promise of a Response):

  - `connect`
  - `delete`
  - `get`
  - `head`
  - `options`
  - `patch`
  - `post`
  - `put`
  - `trace`

- Finally, `all` takes only one parameter, a function which takes a Request and returns a Response or a Promise of a Response. All requests will be handled by this function. This can be useful to change the default 404 behaviour.
