# Cloudflare Workers Fetch Helpers

All methods exported from this library can be chained together and have the following usage:

```typescript
import {
  fetchHelper,
  otherFetchHelper,
} from "@glenstack/cf-workers-fetch-helpers";

const fetch1 = fetchHelper(fetch, fetchHelperOptions);
const fetch2 = otherFetchHelper(fetch1, otherFetchHelperOptions);
```

Where `fetch`, `fetch1` and `fetch2` are all [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) compatible functions, and `fetchHelperOptions` & `otherFetchHelperOptions` are options for each helper function, as defined below.

## `alterURL`

Changes the Request URL.

### Options Signature

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

### Options

| Option    | Notes                                                   |
| --------- | ------------------------------------------------------- |
| `prepend` | Prepends the URL with a given string.                   |
| `append`  | Appends the URL with a given string.                    |
| `mutate`  | A function that, when given a URL, returns the new URL. |

### Example Usage

```typescript
import { alterURL } from "@glenstack/cf-workers-fetch-helpers";

const gitHubFetch = alterURL(fetch, { prepend: "https://api.github.com" });

(async () => {
  const response = await gitHubFetch("/meta");
})();
```

## `addHeaders`

Adds headers to the Request.

### Options Signature

```typescript
type options = {
  headers: RequestInit["headers"];
};
```

### Options

| Option    | Notes                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `headers` | [A Headers object, an object literal, or an array of two-item arrays to set request’s headers.](https://fetch.spec.whatwg.org/#typedefdef-headersinit) |

### Example Usage

```typescript
import { addHeaders } from "@glenstack/cf-workers-fetch-helpers";

const gitHubFetch = addHeaders(fetch, {
  headers: { Authorization: "Basic xyz", "User-Agent": "Awesome-Octocat-App" },
});

(async () => {
  const response = await gitHubFetch("/meta");
})();
```
