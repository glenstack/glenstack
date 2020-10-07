import { makeGitHub } from "./gitHub";
import { getRequestFromCalledMockFetch } from "./index.test";

const mockFetch = jest.fn(() => Promise.resolve(new Response()));

global.fetch = mockFetch as any;

describe("gitHub", () => {
  const gitHub = makeGitHub({
    clientID: "anID",
    clientSecret: "aSecret",
    serverBaseURL: "https://example.com",
    authFunctions: {
      getUserIDFromRequest: async () => "aUserID",
    },
    storageFunctions: {
      getOAuthConfigFromUserID: async () => ({
        accessToken: "anAccessToken",
        refreshToken: "aRefreshToken",
      }),
      updateOAuthConfigForUserID: async () => {},
    },
  });

  it("blocks requests to URLs that are not allowed", async () => {
    const request = new Request(
      "https://example.com/.git-gateway/git/github/orgs/acme/settings/billing/actions"
    );
    expect((await gitHub.gitGateway(request)).status).toBe(403);
  });
  it("allows requests to URLs that are allowed and re-routes successfully", async () => {
    await gitHub.gitGateway(
      new Request(
        "https://example.com/.git-gateway/git/github/repos/acme/project/contents/filepath"
      )
    );
    const request = getRequestFromCalledMockFetch(mockFetch);

    expect(request.url).toEqual(
      "https://api.github.com/repos/acme/project/contents/filepath"
    );
    expect(request.headers.get("Authorization")).toMatchInlineSnapshot(
      `"Bearer anAccessToken"`
    );
    expect(request.headers.get("User-Agent")).toEqual(
      "Cloudflare Workers Git Gateway"
    );
    expect(request.headers.get("Accept")).toEqual(
      "application/vnd.github.v3+json"
    );
  });
});
