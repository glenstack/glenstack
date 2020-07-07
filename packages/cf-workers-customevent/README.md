# Cloudflare Workers CustomEvent

A polyfill [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) implementation for [Cloudflare Workers](https://workers.cloudflare.com/).

## Installation

```sh
npm install --save @glenstack/cf-workers-customevent
```

## Usage

```typescript
import { CustomEvent } from "@glenstack/cf-workers-customevent";

addEventListener("myCustomEvent", (event) => {
  // Note: the `event` argument is the MyCustomEvent instance, rather than the FetchEvent.
  console.log("Hello from a myCustomEvent instance!");
});

addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === "/fireCustomEvent") {
    const e = new CustomEvent("myCustomEvent");
    dispatchEvent(e);
  }

  event.respondWith(new Response("Hello, world!"));
});

// GET-ing `/fireCustomEvent` will log "Hello from a myCustomEvent instance!" and respond with "Hello, world!"
// GET-ing `/` will just respond with "Hello, world!"
```

Optionally, you can also pass through extra information with the CustomEvent using the `detail` property:

```typescript
import { CustomEvent } from "@glenstack/cf-workers-customevent";

addEventListener("myCustomEvent", (event: any) => {
  const name = event.detail.searchParams.get("name");
  console.log(`Hello ${name}, from a myCustomEvent instance!`);
});

addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === "/fireCustomEvent") {
    const e = new CustomEvent("myCustomEvent", {
      detail: { searchParams: url.searchParams },
    });
    dispatchEvent(e);
  }

  event.respondWith(new Response("Hello, world!"));
});

// GET-ing `/fireCustomEvent?name=Greg` will log "Hello Greg, from a myCustomEvent instance!" and respond with "Hello, world!"
// GET-ing `/` will just respond with "Hello, world!"
```

And finally, you can also pass through the original FetchEvent, in order to respond from within the custom event listener:

```typescript
import { CustomEvent } from "@glenstack/cf-workers-customevent";

addEventListener("myCustomEvent", (event: any) => {
  const name = event.detail.searchParams.get("name");
  event.detail.fetchEvent.respondWith(new Response(`Hello, ${name}!`));
});

addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === "/fireCustomEvent") {
    const e = new CustomEvent("myCustomEvent", {
      detail: { searchParams: url.searchParams, fetchEvent: event },
    });
    dispatchEvent(e);
  } else {
    event.respondWith(new Response("Hello, world!"));
  }
});

// GET-ing `/fireCustomEvent?name=Greg` will respond with "Hello, Greg!"
// GET-ing `/` will just respond with "Hello, world!"
```
