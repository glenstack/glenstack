# Cloudflare Workers Fetch Helpers

A collection of chainable helpers to adapt the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

### Installation

```sh
npm install --save @glenstack/cf-workers-fetch-helpers
```

### Usage

All methods exported from this library can be chained together and have the following usage:

```typescript
import {
  fetchHelper,
  otherFetchHelper,
} from "@glenstack/cf-workers-fetch-helpers";

const fetch1 = fetchHelper(fetch, fetchHelperOptions); // `fetch` is the built-in fetch global
const fetch2 = otherFetchHelper(fetch1, otherFetchHelperOptions); // NOTE: `fetch1` is being chained here, such that `fetch2(request)` calls `fetch1(request)`, which calls `fetch(request)`

(async () => {
  const response = await fetch2("https://example.com");
})();
```

Where:

- `fetch`, `fetch1` and `fetch2` are all [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) compatible functions,
- `fetchHelper` and `otherFetchHelper` are fictional functions in this library (see below for the real ones),
- `fetchHelperOptions` and `otherFetchHelperOptions` are the options for these fictional helper functions (again, the real functions and their options follow).

### `alterURL`

Changes the Request URL.

#### Options Signature

```typescript
type options =
  | {
      prepend?: string;
      append?: string;
    }
  | {
      mutate: (prevURL: string) => string;
    };
```

#### Options

| Option    | Notes                                                   |
| --------- | ------------------------------------------------------- |
| `prepend` | Prepends the URL with a given string.                   |
| `append`  | Appends the URL with a given string.                    |
| `mutate`  | A function that, when given a URL, returns the new URL. |

#### Example Usage

```typescript
import { alterURL } from "@glenstack/cf-workers-fetch-helpers";

const gitHubFetch = alterURL(fetch, { prepend: "https://api.github.com" });

(async () => {
  const response = await gitHubFetch("/meta");
})();
```

### `addHeaders`

Adds headers to the Request.

#### Options Signature

```typescript
type options = {
  headers: RequestInit["headers"];
};
```

#### Options

| Option    | Notes                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `headers` | [A Headers object, an object literal, or an array of two-item arrays to set request’s headers.](https://fetch.spec.whatwg.org/#typedefdef-headersinit) |

#### Example Usage

```typescript
import { addHeaders } from "@glenstack/cf-workers-fetch-helpers";

const gitHubFetch = addHeaders(fetch, {
  headers: { Authorization: "Basic xyz", "User-Agent": "Awesome-Octocat-App" },
});

(async () => {
  const response = await gitHubFetch("/meta");
})();
```

### `authorization`

Adds an Authorization header. The following types of authorization are supported:

- Basic
- Bearer

#### Options Signature

```typescript
type options =
  | {
      username?: string;
      password?: string;
    }
  | {
      bearere: string;
    };
```

#### Options

| Option     | Notes                                        |
| ---------- | -------------------------------------------- |
| `username` | Used in basic authorization.                 |
| `password` | Used in basic authorization.                 |
| `bearer`   | A bearer token used in bearer authorization. |

#### Example Usage

```typescript
import { authorization } from "@glenstack/cf-workers-fetch-helpers";

const gitHubFetch = authorization(fetch, { bearer: "aToken" });

(async () => {
  const response = await gitHubFetch("/meta");
})();
```
