import { addHeaders } from "./addHeaders";

type AuthorizationOptions =
  | {
      username?: string;
      password?: string;
    }
  | {
      bearer: string;
    };

const btoa = (value: string) => Buffer.from(value, "binary").toString("base64");

export const authorization = (
  prevFetch: typeof fetch,
  options: AuthorizationOptions
): typeof fetch => {
  let authorization;
  if ("username" in options || "password" in options) {
    const basicAuth = btoa(
      `${options.username || ""}:${options.password || ""}`
    );
    authorization = `Basic ${basicAuth}`;
  } else if ("bearer" in options) {
    authorization = `Bearer ${options.bearer}`;
  }

  return addHeaders(prevFetch, {
    headers: { Authorization: authorization },
  });
};
