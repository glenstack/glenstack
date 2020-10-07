import { authorization } from "./authorization";

type OAuth2Options = {
  accessToken?: string;
  tokenRefreshed?: typeof tokenRefreshed;
  authorizationHasExpired?: typeof authorizationHasExpired;
} & RefreshTokenOptions;

type RefreshTokenOptions = {
  refreshToken: string;
  tokenEndpoint: string;
  clientID: string;
  clientSecret: string;
  redirectURI?: string;
  scope?: string;
  refreshFetch?: typeof fetch;
};

const getNewToken = async ({
  refreshToken,
  tokenEndpoint,
  clientID,
  clientSecret,
  redirectURI,
  scope,
  refreshFetch = fetch,
}: RefreshTokenOptions) => {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientID,
    client_secret: clientSecret,
    ...(scope === undefined ? {} : { scope }),
    ...(redirectURI === undefined ? {} : { redirect_uri: redirectURI }),
  });

  try {
    const response = await refreshFetch(tokenEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
    const data = await response.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    throw new Error("Could not refresh token. It might have expired.");
  }
};

const authorizationHasExpired = async (response: Response) => {
  return response.status === 401;
};

const tokenRefreshed = (options: {
  accessToken?: string;
  refreshToken: string;
}) => Promise.resolve();

export const oauth2 = (
  prevFetch: typeof fetch,
  options: OAuth2Options
): typeof fetch => {
  let accessToken: string = options.accessToken;

  const authedFetch = (...args: Parameters<typeof fetch>) =>
    authorization(prevFetch, {
      bearer: accessToken,
    })(...args);

  const fetchWithRetry = async (...args: Parameters<typeof fetch>) => {
    let response = await authedFetch(...args);

    if (
      await (options.authorizationHasExpired || authorizationHasExpired)(
        response
      )
    ) {
      const refreshData = await getNewToken(options);
      accessToken = refreshData.accessToken;
      options.refreshToken = refreshData.refreshToken;

      await (options.tokenRefreshed || tokenRefreshed)(refreshData);

      response = await authedFetch(...args);
    }

    return response;
  };

  return fetchWithRetry;
};
