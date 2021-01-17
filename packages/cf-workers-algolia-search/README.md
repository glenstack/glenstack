# Cloudflare Workers Algolia Search

An [Algolia](https://www.algolia.com/) search client for [Cloudflare Workers](https://workers.cloudflare.com/).

## Installation

```sh
npm install --save @glenstack/cf-workers-algolia-search
```

## Usage

```typescript
import algoliasearch from "@glenstack/cf-workers-algolia-search";

const client = algoliasearch("ApplicationID", "APIKey");
const index = client.initIndex("IndexName");

const handleRequest = async (request) => {
  const term = request.searchParams.get("term");
  const { hits } = await index.search(term);

  return new Response(JSON.stringify(hits), {
    headers: { "Content-Type": "application/json" },
  });
};

addEventListener("fetch", (event) => {
  const { request } = event;
  event.respondWith(handleRequest(request));
});
```

`algoliasearch` is an implementation of the official Algolia search client, so reference [its documentation](https://www.algolia.com/doc/api-client/methods/search/). **Note however, that [timeouts](https://www.algolia.com/doc/api-reference/api-methods/configuring-timeouts/) are not respected.**
