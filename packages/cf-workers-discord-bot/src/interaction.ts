import nacl from "tweetnacl";
import {
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionType,
  InteractionResponseType,
} from "./types";

const jsonResponse = (data: any) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

const makeValidator = ({ publicKey }: { publicKey: string }) => async (
  request: Request
) => {
  const signature = String(request.headers.get("X-Signature-Ed25519"));
  const timestamp = String(request.headers.get("X-Signature-Timestamp"));
  const body = await request.text();

  const isValid = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(publicKey, "hex")
  );

  if (!isValid) throw new Error("Invalid request");
};

const DEFAULT_COMMAND: ApplicationCommand = {
  name: "",
  description: "",
};

const DEFAULT_HANDLER: InteractionHandler = () => ({
  type: InteractionResponseType.Pong,
});

export const interaction = ({
  publicKey,
  commands,
}: {
  publicKey: string;
  commands: [ApplicationCommand, InteractionHandler][];
}) => {
  const validateRequest = makeValidator({ publicKey });

  return async (request: Request): Promise<Response> => {
    try {
      await validateRequest(request.clone());

      try {
        const interaction = (await request.json()) as Interaction;

        if (interaction.type == InteractionType.Ping) {
          return jsonResponse({ type: 1 });
        } else if (interaction.type == InteractionType.ApplicationCommand) {
          const [command, handler]: [
            ApplicationCommand,
            InteractionHandler
          ] = commands.find(
            ([command, handler]) => command.name === interaction.data.name
          ) || [DEFAULT_COMMAND, DEFAULT_HANDLER];

          return jsonResponse(await handler(interaction));
        }
      } catch (e) {
        return new Response(null, { status: 400 });
      }
    } catch (e) {
      return new Response(null, { status: 401 });
    }
  };
};
