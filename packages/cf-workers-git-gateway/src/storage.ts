export type UserOAuthConfig = {
  accessToken?: string;
  refreshToken: string;
};

type GetOAuthConfigFromUserID = (userID: string) => Promise<UserOAuthConfig>;
type UpdateOAuthConfigForUserID = (
  userID: string,
  config: UserOAuthConfig
) => Promise<void>;

type StorageOptions =
  | {
      namespace: KVNamespace;
    }
  | StorageFunctions;

export type StorageFunctions = {
  getOAuthConfigFromUserID: GetOAuthConfigFromUserID;
  updateOAuthConfigForUserID: UpdateOAuthConfigForUserID;
};

const keyFromUserID = (userID: string, service: string) =>
  `User:${userID}:${service}`;

export const makeStorageFunctions = async (
  options: StorageOptions,
  service: string
): Promise<StorageFunctions> => {
  if ("namespace" in options) {
    const getOAuthConfigFromUserID: GetOAuthConfigFromUserID = (
      userID: string
    ) => options.namespace.get(keyFromUserID(userID, service), "json");
    const updateOAuthConfigForUserID: UpdateOAuthConfigForUserID = (
      userID: string,
      config: UserOAuthConfig
    ) =>
      options.namespace.put(
        keyFromUserID(userID, service),
        JSON.stringify(config)
      );

    return {
      getOAuthConfigFromUserID,
      updateOAuthConfigForUserID,
    };
  } else {
    return options;
  }
};
