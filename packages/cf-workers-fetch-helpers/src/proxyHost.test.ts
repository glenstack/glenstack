import { proxyHost } from "./proxyHost";
import { getRequestFromCalledMockFetch } from "./index.test";

const mockFetch = jest.fn();

describe("proxyHost", () => {
  it("should add headers", () => {
    const proxiedFetch = proxyHost(mockFetch, {
      host: "otherhost.com",
    });
    proxiedFetch("https://example.com/path");
    const { url } = getRequestFromCalledMockFetch(mockFetch);
    expect(url).toEqual("https://otherhost.com/path");
  });
});
