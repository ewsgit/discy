import discord from "discord.js";
import dotenv from "dotenv";
import {request} from "undici";

export default class hypixel {
  client: discord.Client;

  registerBotCommands = [
    {
      name: "hypixel",
      description: "hypixel command",
      options: [{
        name: "get-player",
        description: "Get player info",
        type: "string",
      }]
    },
  ];

  constructor() {
    dotenv.config({
      path: "./../.env",
    });
  }

  hypixelApi = {
    getPlayer(playerName: string) {
        return request(
            `https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&name=${playerName}`
        )
    }
  }

  onInteractionCreate(interaction: discord.Interaction) {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
      case "hypixel":

        break;
    }
  }
}
