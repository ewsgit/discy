import discord from "discord.js";
import dotenv from "dotenv";
import * as database from "./../database.js";

export default class moduleName {
  client: discord.Client;

  registerBotCommands = [
    {
      name: "developer",
      description: "developer command",
      options: [
        {
          name: "command",
          description: "command to run",
          type: "string",
          allowedValues: [
            {
              name: "echo database",
              value: "echo-database",
            },
          ],
        },
      ],
    },
  ];
  constructor() {
    dotenv.config({
      path: "./../.env",
    });
  }

  onInteractionCreate(interaction: discord.Interaction) {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
      case "developer":
        if (interaction.options.getString("command")) {
          switch (interaction.options.getString("command")) {
            case "echo-database":
              interaction.reply(database.getAllData().toString());
              break;
          }
        } else {
          interaction.reply("No command specified!");
        }
        break;
    }
  }
}
