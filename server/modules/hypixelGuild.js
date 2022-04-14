import dotenv from "dotenv";
import { request } from "undici";
import * as db from "./../database.js";
export default class hypixelGuild {
    constructor() {
        this.registerBotCommands = [
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
        dotenv.config({
            path: "./../.env",
        });
    }
    onInteractionCreate(interaction) {
        if (!interaction.isCommand())
            return;
        switch (interaction.commandName) {
            case "verifyguild":
                if (interaction.options.getString("username")) {
                    // user has entered a username
                    // check if the user is in the guild
                    // if they are, send them a message
                    // if they are not, send them a message
                    // get the user endpoint from the hypixel api
                    request("https://api.mojang.com/users/profiles/minecraft/" +
                        interaction.options.getString("username"))
                        .then(res => res.body.json())
                        .then(res => {
                        request(`https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&uuid=${res.id}`)
                            .then(res => res.body.json())
                            .then(player => {
                            if (player.player.socialMedia.links.DISCORD ===
                                interaction.user.tag) {
                                request(`https://api.hypixel.net/guild?key=${process.env.HYPIXEL_API_KEY}&player=${res.id}`)
                                    .then(res => res.body.json())
                                    .then(guild => {
                                    var _a;
                                    guild = guild.guild;
                                    if (guild.name === ((_a = db.getGuildData(interaction.guild.id)) === null || _a === void 0 ? void 0 : _a.hypixelGuild)) {
                                        interaction.reply("You have linked your discord account and in the guild :D");
                                    }
                                    else {
                                        interaction.reply("You have linked your discord account but not in the guild :/");
                                    }
                                    let userData = db.getUserData(interaction.user.id);
                                    userData.hypixelGuild = guild.name;
                                    db.writeUserData(interaction.user.id, userData);
                                    interaction.reply(`You are in the guild ${guild.name}, ${interaction.user.username}!`);
                                });
                            }
                            else {
                                interaction.reply("failed to verify :^( , please connect your discord account to hypixel!");
                            }
                        });
                    });
                }
                else {
                    interaction.reply("No username specified!");
                }
                break;
            case "hypixelguild":
                let userData = db.getUserData(interaction.user.id);
                if (userData.hypixelGuild) {
                    interaction.reply("You are in the guild " + userData.hypixelGuild);
                }
            case "sethypixelguild":
        }
    }
}
