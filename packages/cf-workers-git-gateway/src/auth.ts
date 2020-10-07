import { createAuthenticator } from "@glenstack/cf-workers-access";

type GetUserIDFromRequest = (request: Request) => Promise<string>;

type AuthOptions = Parameters<typeof createAuthenticator> | AuthFunctions;

export type AuthFunctions = { getUserIDFromRequest: GetUserIDFromRequest };

export const makeAuthFunctions = async (
  authOptions: AuthOptions
): Promise<AuthFunctions> => {
  if ("getUserIDFromRequest" in authOptions) {
    return authOptions;
  } else {
    const authenticator = await createAuthenticator(...authOptions);
    const getUserIDFromRequest = async (request: Request) => {
      const jwt = await authenticator(request);
      if (jwt) {
        return jwt.email;
      }

      throw new Error("Unauthenticated");
    };

    return { getUserIDFromRequest };
  }
};
