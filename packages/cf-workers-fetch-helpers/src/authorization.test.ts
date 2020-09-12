import { authorization } from "./authorization";
import { getRequestFromCalledMockFetch } from "./index.test";

const mockFetch = jest.fn();

describe("authorization", () => {
  it("should encode and attach basic auth", () => {
    const authorizationFetch = authorization(mockFetch, {
      username: "LET ME",
      password: "IN!",
    });
    authorizationFetch("https://example.com/");
    const { headers } = getRequestFromCalledMockFetch(mockFetch);
    expect(headers.get("Authorization")).toMatchInlineSnapshot(
      `"Basic TEVUIE1FOklOIQ=="`
    );
  });
  it("should add bearer tokens", () => {
    const bearerFetch = authorization(mockFetch, {
      bearer: "aToken",
    });
    bearerFetch("https://example.com/");
    const { headers } = getRequestFromCalledMockFetch(mockFetch);
    expect(headers.get("Authorization")).toEqual("Bearer aToken");
  });
});
