import discord from "discord.js";
export default class guildAdmin {
    client: discord.Client;
    registerBotCommands: any[];
    constructor();
    onInteractionCreate(interaction: discord.Interaction): void;
}
