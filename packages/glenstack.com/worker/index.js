import {
  getAssetFromKV,
  mapRequestToAsset,
} from "@cloudflare/kv-asset-handler";
import { handleEvent as server } from "./server";

addEventListener("fetch", (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

const handleEvent = async (event) => {
  const serverResponse = await server(event);
  if (serverResponse !== undefined) return serverResponse;

  try {
    return await getAssetFromKV(event, {});
  } catch (e) {
    const notFoundResponse = await getAssetFromKV(event, {
      mapRequestToAsset: (req) =>
        new Request(`${new URL(req.url).origin}/404.html`, req),
    });

    return new Response(notFoundResponse.body, {
      ...notFoundResponse,
      status: 404,
    });
  }
};
