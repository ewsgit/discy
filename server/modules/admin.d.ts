import discord from "discord.js";
export default class moduleName {
    client: discord.Client;
    registerBotCommands: {
        name: string;
    }[];
    constructor();
    onInteractionCreate(interaction: discord.Interaction): void;
}
