import discord from "discord.js";

export default class hypixel {
    client: discord.Client;
    registerBotCommands = [{
        name: "hypixel", description: "hypixel command"
    }]

    interactionCreate(interaction) {
    }
}