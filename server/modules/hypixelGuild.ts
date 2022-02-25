import discord from "discord.js";
import dotenv from "dotenv";
import { request } from "undici";
import * as db from "./../database.js";

export default class hypixelGuild {
  client: discord.Client;

  registerBotCommands = [
    {
      name: "verifyguild",
      description: "verify that you are in the guild",
      options: [
        {
          name: "username",
          description: "your username",
          type: "string",
        },
      ],
    },
    {
      name: "hypixelguild",
      description: "hypixel guild command",
      options: [
        {
          name: "get-verified-player-guild-xp",
          description: "Get player guild xp",
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

  onInteractionCreate(interaction: discord.Interaction) {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
      case "verifyguild":
        if (interaction.options.getString("username")) {
          // user has entered a username
          // check if the user is in the guild
          // if they are, send them a message
          // if they are not, send them a message

          // get the user endpoint from the hypixel api

          request(
            "https://api.mojang.com/users/profiles/minecraft/" +
              interaction.options.getString("username")
          )
            .then(res => res.body.json())
            .then(res => {
              request(
                `https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&uuid=${res.id}`
              )
                .then(res => res.body.json())
                .then(player => {
                  if (
                    player.player.socialMedia.links.DISCORD ===
                    interaction.user.tag
                  ) {
                    interaction.reply(
                      "you have been successfully verified, welcome to " +
                        interaction.guild.name +
                        interaction.user.username +
                        " !"
                    );
                    let userData = db.getUserData(interaction.user.id);
                    userData.hypixelGuild = interaction.guild.name;
                    db.writeUserData(interaction.user.id, userData);
                  } else {
                    interaction.reply(
                      "failed to verify :^( , please join the guild!"
                    );
                  }
                });
            });
        } else {
          interaction.reply("No username specified!");
        }
        break;
      case "hypixelguild":
    }
  }
}
