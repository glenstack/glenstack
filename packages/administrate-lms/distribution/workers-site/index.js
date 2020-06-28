import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

const handleError = (error) => {
  console.error(error);
};

addEventListener("fetch", (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

async function handleEvent(event) {
  let options = {};

  try {
    const page = await getAssetFromKV(event, options);

    const response = new Response(page.body, page);

    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "unsafe-url");
    response.headers.set("Feature-Policy", "none");

    return response;
  } catch (error) {
    handleError(error);

    return new Response(`Not Found`, {
      status: 404,
    });
  }
}
