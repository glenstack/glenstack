import { Router } from ".";

const getBody = async (response: Promise<Response> | Response) =>
  await (await response).text();

describe("Router", () => {
  const router = new Router();
  router.get("/hello", () => new Response("world!"));
  router.post(/\/hi/, () => new Response("POST received!"));
  router.handle(
    (request) => request.headers.has("x-secret"),
    () => new Response("TOP SECRET!")
  );

  const catchAllRouter = new Router();
  catchAllRouter.all(() => new Response("CAUGHT!"));

  it("routes simple method requests", async () => {
    expect(
      await getBody(router.route(new Request("https://example.com/hello")))
    ).toEqual("world!");

    expect(
      await getBody(
        router.route(new Request("https://example.com/hi", { method: "POST" }))
      )
    ).toEqual("POST received!");
  });

  it("handles custom delegators", async () => {
    expect(
      await getBody(
        router.route(
          new Request("https://example.com/", {
            headers: { "x-secret": "sneaky" },
          })
        )
      )
    ).toEqual("TOP SECRET!");
  });

  it("returns a 404", async () => {
    const response = await router.route(new Request("https://example.com/404"));
    expect(response.status).toBe(404);
  });

  it("can route a catch-all", async () => {
    expect(
      await getBody(catchAllRouter.route(new Request("https://example.com/")))
    ).toEqual("CAUGHT!");
  });
});
