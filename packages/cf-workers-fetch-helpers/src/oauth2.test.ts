import { oauth2 } from "./oauth2";
import { getRequestFromCalledMockFetch } from "./index.test";

const mockFetch = jest.fn((...args: Parameters<typeof fetch>) =>
  Promise.resolve(new Response())
);
const mockRefreshFetch = jest.fn(() =>
  Promise.resolve(
    new Response(
      JSON.stringify({
        access_token: "aNewAccessToken",
        refresh_token: "aNewRefreshToken",
        token_type: "Bearer",
      })
    )
  )
);
const mockTokenRefreshed = jest.fn(() => Promise.resolve());

describe("oauth2", () => {
  const oauth2Fetch = oauth2(mockFetch, {
    accessToken: "anAccessToken",
    clientID: "anID",
    clientSecret: "aSecret",
    refreshToken: "aRefreshToken",
    tokenEndpoint: "https://example.com/oauth/token",
    tokenRefreshed: mockTokenRefreshed,
    refreshFetch: mockRefreshFetch,
  });

  it("should add the access token as bearer auth", async () => {
    await oauth2Fetch("https://example.com/");
    expect(mockRefreshFetch).toBeCalledTimes(0);
    expect(mockFetch).toBeCalledTimes(1);
    const { headers } = getRequestFromCalledMockFetch(mockFetch);
    expect(headers.get("Authorization")).toMatchInlineSnapshot(
      `"Bearer anAccessToken"`
    );
  });
  it("attempts to refresh a token if the request fails", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve(new Response(null, { status: 401 }))
    );
    await oauth2Fetch("https://example.com/");
    expect(mockTokenRefreshed).toHaveBeenCalledWith({
      accessToken: "aNewAccessToken",
      refreshToken: "aNewRefreshToken",
    });
    expect(mockRefreshFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledTimes(2);
    const firstRequest = new Request(...mockFetch.mock.calls[0]);
    expect(firstRequest.headers.get("Authorization")).toMatchInlineSnapshot(
      `"Bearer anAccessToken"`
    );
    const secondRequest = new Request(...mockFetch.mock.calls[1]);
    expect(secondRequest.headers.get("Authorization")).toMatchInlineSnapshot(
      `"Bearer aNewAccessToken"`
    );
    mockFetch.mockReset();
  });
});
