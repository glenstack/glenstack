import { authorization } from "@glenstack/cf-workers-fetch-helpers";
import { ApplicationCommand, InteractionHandler } from "./types";

const TOKEN_URL = "https://discord.com/api/v6/oauth2/token";

const getAuthorizationCode = async (authedFetch: typeof fetch) => {
  const request = new Request(TOKEN_URL, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "applications.commands.update",
    }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const response = await authedFetch(request);
  if (!response.ok) throw new Error("Failed to request an Authorization code.");

  try {
    const data = await response.json();
    return data.access_token;
  } catch {
    throw new Error("Failed to parse the Authorization code response.");
  }
};

const deleteExistingCommands = async (
  { applicationID }: { applicationID: string },
  authedFetch: typeof fetch
): Promise<void> => {
  const url = `https://discord.com/api/v8/applications/${applicationID}/commands`;
  const response = await authedFetch(url);
  const commands = await response.json();

  await Promise.all(
    commands.map(
      (
        command: ApplicationCommand & { id: string; application_id: string }
      ) => {
        return authedFetch(
          `https://discord.com/api/v8/applications/${applicationID}/commands/${command.id}`,
          {
            method: "DELETE",
          }
        );
      }
    )
  );
};

const createCommands = async (
  {
    applicationID,
    commands,
  }: {
    applicationID: string;
    commands: [ApplicationCommand, InteractionHandler][];
  },
  authedFetch: typeof fetch
): Promise<Response> => {
  const url = `https://discord.com/api/v8/applications/${applicationID}/commands`;

  const promises = commands.map(async ([command, handler]) => {
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(command),
      headers: { "Content-Type": "application/json" },
    });

    const error = new Error(`Setting command ${command.name} failed!`);

    try {
      const response = await authedFetch(request);
      if (!response.ok) throw error;
      return response;
    } catch (e) {
      throw error;
    }
  });

  return await Promise.all(promises)
    .then(() => new Response("OK"))
    .catch((e) => new Response(e.message, { status: 502 }));
};

export const setup = ({
  applicationID,
  applicationSecret,
  commands,
}: {
  applicationID: string;
  applicationSecret: string;
  commands: [ApplicationCommand, InteractionHandler][];
}) => {
  const basicAuthFetch = authorization(fetch, {
    username: applicationID,
    password: applicationSecret,
  });

  return async (): Promise<Response> => {
    try {
      const bearer = await getAuthorizationCode(basicAuthFetch);
      const authedFetch = authorization(fetch, { bearer });

      await deleteExistingCommands({ applicationID }, authedFetch);
      return await createCommands({ applicationID, commands }, authedFetch);
    } catch {
      return new Response(
        "Failed to authenticate with Discord. Are the Application ID and secret set correctly?",
        { status: 407 }
      );
    }
  };
};
