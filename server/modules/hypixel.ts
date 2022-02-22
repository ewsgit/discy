import discord from "discord.js";
import dotenv from "dotenv";
import { request } from "undici";

export default class hypixel {
  client: discord.Client;

  registerBotCommands = [
    {
      name: "hypixel",
      description: "hypixel command",
      options: [
        {
          name: "get-player",
          description: "Get player info",
          type: "string",
        },
      ],
    },
  ];

  constructor() {
    dotenv.config({
      path: "./../.env",
    });
  }

  hypixelApi = {
    getPlayer(playerName: string) {
      // request the mojang user api to get the uuid of the player
      request("https://api.mojang.com/users/profiles/minecraft/" + playerName)
        .then(res => res.body.json())
        .then(res => {
          return request(
            `https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&uuid=${res.id}`
          );
        });
    },
  };

  onInteractionCreate(interaction: discord.Interaction) {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
      case "hypixel":
        if (interaction.options.getString("get-player")) {
          console.log(interaction.options.getString("get-player"));
          console.log(
            JSON.stringify(
              this.hypixelApi.getPlayer(
                interaction.options.getString("get-player")
              )
            )
          );
        } else {
          interaction.reply("No player specified");
        }
        break;
    }
  }
}
