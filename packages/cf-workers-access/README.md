# Cloudflare Workers Access

Authenticate with [Cloudflare Access](https://teams.cloudflare.com/access/) from within a [Cloudflare Worker](https://workers.cloudflare.com/).

## Installation

```sh
npm install --save @glenstack/cf-workers-access
```

## Usage

```typescript
import { createAuthenticator } from "@glenstack/cf-workers-access";

const AUTHENTICATION_DOMAIN = "glenstack.cloudflareaccess.com";
const POLICY_AUD =
  "f8612530c08484786e83e00ff7b549bc3763747beae55ec909cc28a6a56b81d1";

const handleEvent = async (event) => {
  const authenticator = await createAuthenticator(AUTHENTICATION_DOMAIN, {
    aud: POLICY_AUD,
  });

  const jwt = await authenticator(event.request);

  if (jwt) {
    return new Response(`Hello, ${jwt.email}!`);
  }

  return new Response("Unauthorized", { status: 401 });
};

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});
```

`createAuthenticator` takes two parameters:

1. The "Login Page Domain" of your Cloudflare Access account e.g. `glenstack.cloudflareaccess.com`.
1. Optionally, an object with the optional parameters:

   - `aud`: The "Audience Tag" of your Access Policy.
   - `iss`: Automatically set to the "Login Page Domain", but optionally overridable.
   - `tolerance`: Number of seconds of leeway for validating `exp` and `nbf` claims. Defaults to `0`.

It returns a Promise of a function which, in turn, takes a request and returns a Promise of either:

- `false` (in the event that the request is failed authentication), or
- [the JWT payload](https://developers.cloudflare.com/access/setting-up-access/json-web-token/#payload).
