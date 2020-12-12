# Cloudflare Workers Function Memoizer

A wrapper which utilizes [Cloudflare Workers KV](https://developers.cloudflare.com/workers/learning/how-kv-works) to memoize a function.

## Installation

```sh
npm install --save @glenstack/cf-workers-kv-function-memoizer
```

## Usage

```typescript
import { makeMemoizer } from "@glenstack/cf-workers-customevent";

const memoize = makeMemoizer(CACHE_KV_NAMESPACE);

let anExpensiveFunction = async (anArgument: string) => {
  // ...
  return someResult;
};

anExpensiveFunction = memoize(
  anExpensiveFunction,
  {
    keyGenerator: (anArgument) => `anExpensiveFunction:${anArgument}`,
    resultTransformer: JSON.stringify,
    type: "json",
  },
  {
    expirationTtl: 60 * 60,
  }
);

// anExpensiveFunction is then ready to call with argument e.g. "hello"

(async () => {
  // First time, it'll execute and then cache the `JSON.stringify`-d result with `anExpensiveFunction:hello`. The cached value is set to expire in 60 minutes.
  let result = await anExpensiveFunction("hello");

  // Subsequent calls will first look up the CACHE_KV_NAMESPACE and return the result if it is found, parsing as "json".
  result = await anExpensiveFunction("hello");

  // One hour later...
  // Once the cached result is evicted, anExpensiveFunction will be re-run, and the result re-cached.
  result = await anExpensiveFunction("hello");
})();
```

`makeMemoizer` takes one parameter:

1. The KV Namespace to be used as the cache.

It returns a function which, in turn, takes a three parameters:

1. The expensive async function to be memoized

1. Optionally, an object with the optional parameters:

   - `keyGenerator`: A function which takes the same arguments as the memoized function, and returns a string to be used as the key in the cache KV namespace. By default, it creates a string formatted like:

     `functionName:arg0,arg1,arg2...`

     Where `functionName` is the name of the memoized function and the `argX`'s are the arguments passed to it. **Note: Function names often get minified by bundlers such as webpack, so you should strongly consider defining your own `keyGenerator` function.**


    - `resultTransformer`: A function which converts the memoized function's return value to a storable value in the KV namespace. Defaults to `JSON.stringify`.

    - `type`: [One of the supported types to parse KV values](https://developers.cloudflare.com/workers/runtime-apis/kv#types) (the inverse of `resultTransformer`). Defaults to 'json'.

1. Optionally, an object of options to pass to KV when setting the value e.g. [expiration times](https://developers.cloudflare.com/workers/runtime-apis/kv#creating-expiring-keys) or [metadata](https://developers.cloudflare.com/workers/runtime-apis/kv#metadata-1).

Finally, this can then be called in the same manner as the memoized function.
