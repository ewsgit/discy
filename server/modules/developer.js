import discord from "discord.js";
import dotenv from "dotenv";
import * as database from "./../database.js";
export default class moduleName {
    constructor() {
        this.registerBotCommands = [
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
                            {
                                name: "update bot",
                                value: "update-bot",
                            }
                        ],
                    },
                ],
            },
        ];
        dotenv.config({
            path: "./../.env",
        });
    }
    onInteractionCreate(interaction) {
        if (!interaction.isCommand())
            return;
        switch (interaction.commandName) {
            case "developer":
                if (interaction.options.getString("command")) {
                    switch (interaction.options.getString("command")) {
                        case "echo-database":
                            interaction.reply(JSON.stringify(database.getAllData()));
                            break;
                        case "update-bot":
                            var embed = new discord.MessageEmbed();
                            embed.setColor("#1da464");
                            embed.setTitle("Discy Updating...");
                            embed.setThumbnail("https://ewsgit.github.io/discy/assets/loading.gif");
                            embed.setDescription("Discy is updating\nplease wait a few minutes");
                            interaction.reply({ embeds: [embed] });
                    }
                }
                else {
                    interaction.reply("No command specified!");
                }
                break;
        }
    }
}
