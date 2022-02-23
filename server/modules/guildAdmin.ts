import discord from "discord.js";
import dotenv from "dotenv";

export default class guildAdmin {
  client: discord.Client;

  registerBotCommands = [];
  constructor() {
    dotenv.config({
      path: "./../.env",
    });
  }

  onInteractionCreate(interaction: discord.Interaction) {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {

    }
  }
}