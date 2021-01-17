import { ApplicationCommand, InteractionHandler } from "./types";
import { Router } from "@glenstack/cf-workers-router";
import { authorize } from "./authorize";
import { interaction } from "./interaction";
import { setup } from "./setup";
export * from "./types";

const router = new Router();

export const createSlashCommandHandler = ({
  applicationID,
  applicationSecret,
  publicKey,
  commands,
}: {
  applicationID: string;
  applicationSecret: string;
  publicKey: string;
  commands: [ApplicationCommand, InteractionHandler][];
}) => {
  router.get("/", authorize({ applicationID }));
  router.post("/interaction", interaction({ publicKey, commands }));
  router.get("/setup", setup({ applicationID, applicationSecret, commands }));
  return (request: Request) => router.route(request);
};
