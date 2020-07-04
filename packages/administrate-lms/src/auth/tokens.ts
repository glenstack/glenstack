import { USER_AGENT } from "../config";
import { Domain } from "../providers/DomainProvider";
import {
  AuthenticationError,
  DomainNotFoundError,
  LoginRateLimitError,
  LoginError,
} from "./errors";
import { Token } from "../providers/TokenProvider";

const GUEST_TOKEN_ENDPOINT =
  "https://portal-auth.administratehq.com/portal/guest";
const LOGIN_TOKEN_ENDPOINT =
  "https://portal-auth.administratehq.com/portal/login";

const DEFAULT_HEADERS = new Headers({
  "Content-Type": "application/json",
  "User-Agent": USER_AGENT,
});

const DEFAULT_TIMEOUT_SECONDS = 60;

const parseToken = async (response: Response): Promise<Token> => {
  try {
    const { portal_token: portalToken } = await response.json();
    if (portalToken === undefined) throw new Error("Token is undefined.");
    return portalToken;
  } catch {
    throw new AuthenticationError(
      "Unable to connect to Administrate as a Guest."
    );
  }
};

export type GuestPayload = { domain: Domain };

export type Username = string;
export type Password = string;
export type LoginPayload = {
  domain: Domain;
  username: Username;
  password: Password;
};

const getToken = async (
  endpoint: string,
  payload: GuestPayload | LoginPayload
) => {
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: DEFAULT_HEADERS,
    });
  } catch (e) {
    // TODO: Network Error: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful
    throw e;
  }
  if (!response.ok)
    switch (response.status) {
      case 401:
      case 400:
        throw new LoginError({
          domain: payload.domain,
        });
      case 404:
        throw new DomainNotFoundError({ domain: payload.domain });
      case 403:
        let timeoutSeconds = DEFAULT_TIMEOUT_SECONDS;
        try {
          timeoutSeconds = (await response.json()).lock_duration;
        } catch {}
        throw new LoginRateLimitError({
          domain: payload.domain,
          timeoutSeconds,
        });
      default:
        throw new AuthenticationError(undefined);
    }

  return await parseToken(response);
};

export const getGuestToken = async (payload: GuestPayload) =>
  getToken(GUEST_TOKEN_ENDPOINT, payload);

export const getLoggedInToken = async (payload: LoginPayload) =>
  getToken(LOGIN_TOKEN_ENDPOINT, payload);

export const getLocalToken = async (
  payload: GuestPayload
): Promise<Token | undefined> => {
  // TODO: Test and invalidate token if expired
  return;
};

export const getLocalTokenOrGuestToken = async (payload: GuestPayload) =>
  (await getLocalToken(payload)) || (await getGuestToken(payload));
