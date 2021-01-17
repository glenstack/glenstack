# Cloudflare Workers Discord Bot

Respond to [Discord Slash Commands](https://discord.com/developers/docs/interactions/slash-commands) from within [Cloudflare Workers](https://workers.cloudflare.com/).

## Installation

```sh
npm install --save @glenstack/cf-workers-discord-bot
```

## Usage

```typescript
import {
  createDiscordHandler,
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
} from "@glenstack/cf-workers-discord-bot";

const helloCommand: ApplicationCommand = {
  name: "hello",
  description: "Bot will say hello to you!",
};

const helloHandler: InteractionHandler = async (
  interaction: Interaction
): Promise<InteractionResponse> => {
  const userID = interaction.member.user.id;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Hello, <@${userID}>!`,
      allowed_mentions: {
        users: [userID],
      },
    },
  };
};

const discordHandler = createDiscordHandler({
  applicationID: "799627301675466772",
  applicationSecret: APPLICATION_SECRET, // You should store this in a secret
  publicKey: "1b780f7f71ac39645d44cc4dce8fa78c860d0157cb0912d755b7a7cb95394532",
  commands: [[helloCommand, helloHandler]],
});

addEventListener("fetch", (event) => {
  event.respondWith(discordHandler(event.request));
});
```

`createDiscordHandler` takes one parameter:

1. An object with the following parameters:

   - `applicationID`: The "Client ID" of your [Discord application](https://discord.com/developers/applications/).
   - `applicationSecret`: The "Client Secret" of your [Discord application](https://discord.com/developers/applications/). **Note: this should be stored securely as a [secret](https://developers.cloudflare.com/workers/cli-wrangler/commands#secret) in the Worker.**
   - `publicKey`: The "Public Key" of your [Discord application](https://discord.com/developers/applications/).
   - `commands`: An array of the commands for your bot to register and respond to.

     Each element of this array should be itself an array with two elements:

     1. An [`ApplicationCommand`](https://discord.com/developers/docs/interactions/slash-commands#applicationcommand) object used to register the command.
     1. A function which takes a single parameter, an [`Interaction`](https://discord.com/developers/docs/interactions/slash-commands#interaction) object, and returns an [`InteractionResponse`](https://discord.com/developers/docs/interactions/slash-commands#interaction-response) or a Promise of an [`InteractionResponse`](https://discord.com/developers/docs/interactions/slash-commands#interaction-response).

It returns a function which takes a Request and returns a Promise of a Response. It should typically be given to the `event.respondWith` function.

This makes your application respond to three types of Requests:

- `GET /`: Redirects the user to Discord to authorize the bot on a server.
- `POST /interaction`: The incoming webhook from Discord to respond to Slash Commands or Pings. **Note: this URL needs to be configured in the Discord Developer Portal as the "Interactions Endpoint URL" e.g. `https://my-discord-bot.workers.dev/interaction`**
- `GET /setup`: Registers the commands with Discord. **Note: this endpoint must be visited once to initialize the new commands, and again everytime the commands are updated.**
