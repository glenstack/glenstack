# Cloudflare Workers hCaptcha

Verify a [hCaptcha](https://www.hcaptcha.com/) token from within a [Cloudflare Worker](https://workers.cloudflare.com/).

## Installation

```sh
npm install --save @glenstack/cf-workers-hcaptcha
```

## Usage

```typescript
import { createVerifier } from "@glenstack/cf-workers-hcaptcha";

const verify = createVerifier("0x0000000000000000000000000000000000000000");

const handleRequest = async (request) => {
  try {
    const payload = await verify(request);
    return new Response("Verified!");
  } catch (e) {
    return new Response(`Could not verify hCaptcha token: ${e.message}`, {
      status: 401,
    });
  }
};

addEventListener("fetch", (event) => {
  const { request } = event;
  event.respondWith(handleRequest(request));
});
```

`createVerifier` takes a single parameter, the secret key used to verify tokens.

It returns a function which, in turn, takes two parameters:

1. The Request.
1. Optionally, an object with the optional parameters:

   - `tokenExtractor`: An asynchronous function which, when given a Request, returns the token to verify. This defaults to extracting `h-captcha-response` from the `formData` body.
   - `sitekey`: The sitekey you expect to see.

It returns a Promise of the [the hCaptcha payload](https://docs.hcaptcha.com/#server) if the verification was successful, else throws an error with [a human-readable error message](https://docs.hcaptcha.com/#server).
