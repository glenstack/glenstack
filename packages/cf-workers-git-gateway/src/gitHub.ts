import {
  alterURL,
  addHeaders,
  oauth2,
  FailedToRefreshOAuth2TokenError,
} from "@glenstack/cf-workers-fetch-helpers";
import { AuthFunctions } from "./auth";
import { StorageFunctions, UserOAuthConfig } from "./storage";

const SERVER = "https://api.github.com";
const TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";
const AUTHORIZATION_ENDPOINT = "https://github.com/login/oauth/authorize";
const ALLOWED_URL_REGEX = /^\/repos\/[^/]+\/[^/]+\/(git|contents|pulls|branches|merges|statuses|compare|commits)\/?/;

class DeniedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DeniedError";
  }
}

const makeUnauthenticatedGitHub = (prevFetch: typeof fetch) =>
  addHeaders(
    alterURL(alterURL(prevFetch, { prepend: SERVER }), {
      mutate: (url) => {
        if (!ALLOWED_URL_REGEX.test(url)) {
          throw new DeniedError(
            "Denied access to a resource not on the allowlist."
          );
        }
        return url;
      },
    }),
    {
      headers: { Accept: "application/vnd.github.v3+json" },
    }
  );

export const makeGitHub = ({
  authFunctions: { getUserIDFromRequest },
  storageFunctions: { getOAuthConfigFromUserID, updateOAuthConfigForUserID },
  clientID,
  clientSecret,
  scope = "",
  serverBaseURL,
  userAgent = "Cloudflare Workers Git Gateway",
  gitGatewayPathPrefix = "/.git-gateway/git/github",
  redirectPath = "/.git-gateway/callback/github",
  callbackResponse = new Response("Success! You may now close this window."),
}: {
  authFunctions: AuthFunctions;
  storageFunctions: StorageFunctions;
  clientID: string;
  clientSecret: string;
  scope?: string;
  serverBaseURL: string;
  userAgent?: string;
  gitGatewayPathPrefix?: string;
  redirectPath?: string;
  callbackResponse?: Response;
}) => {
  const redirect_uri = new URL(redirectPath, serverBaseURL).toString();
  const userAgentFetch = addHeaders(fetch, {
    headers: {
      "User-Agent": userAgent,
    },
  });
  const unauthenticatedGitHub = alterURL(
    makeUnauthenticatedGitHub(userAgentFetch),
    {
      mutate: (url: string) =>
        new URL(url).pathname.replace(gitGatewayPathPrefix, ""),
    }
  );
  const authorizeURL = new URL(AUTHORIZATION_ENDPOINT);
  authorizeURL.searchParams.set("client_id", clientID);
  authorizeURL.searchParams.set("redirect_uri", redirect_uri);
  authorizeURL.searchParams.set("scope", scope);

  return {
    gitGateway: async (request: Request) => {
      let userID: string;
      try {
        userID = await getUserIDFromRequest(request);
      } catch {
        return new Response(null, { status: 401 });
      }

      let userOAuthConfig: UserOAuthConfig;
      try {
        userOAuthConfig = await getOAuthConfigFromUserID(userID);
      } catch {
        return new Response(null, { status: 500 });
      }

      if (!userOAuthConfig || !("accessToken" in userOAuthConfig)) {
        return new Response(null, { status: 407 });
      }

      try {
        const gitHub = oauth2(unauthenticatedGitHub, {
          ...userOAuthConfig,
          clientID,
          clientSecret,
          tokenEndpoint: TOKEN_ENDPOINT,
          refreshFetch: userAgentFetch,
          tokenRefreshed: async (options) => {
            await updateOAuthConfigForUserID(userID, options);
          },
        });

        return await gitHub(request);
      } catch (error) {
        if (error instanceof FailedToRefreshOAuth2TokenError)
          return new Response(null, { status: 407 });

        if (error instanceof DeniedError)
          return new Response(null, { status: 403 });

        console.error(error);
        return new Response(null, { status: 502 });
      }
    },
    callback: async (request: Request) => {
      let userID: string;
      try {
        userID = await getUserIDFromRequest(request);
      } catch {
        return new Response(null, { status: 401 });
      }

      const url = new URL(request.url);
      const code = url.searchParams.get("code");
      if (code === "") {
        return new Response(null, { status: 400 });
      }

      const body = new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        code,
        redirect_uri,
      });

      let data: { access_token: string; refresh_token: string };
      try {
        const response = await userAgentFetch(TOKEN_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });
        data = await response.json();

        if (!("refresh_token" in data)) {
          throw new Error("Failed to exchange Authorization Code.");
        }
      } catch {
        return new Response(null, { status: 502 });
      }

      try {
        await updateOAuthConfigForUserID(userID, {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });

        return callbackResponse;
      } catch {
        return new Response(null, { status: 500 });
      }
    },
    login: async () =>
      new Response(null, {
        status: 302,
        headers: { Location: authorizeURL.toString() },
      }),
  };
};
