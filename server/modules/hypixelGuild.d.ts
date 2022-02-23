import discord from "discord.js";
export default class hypixelGuild {
    client: discord.Client;
    registerBotCommands: {
        name: string;
        description: string;
        options: {
            name: string;
            description: string;
            type: string;
        }[];
    }[];
    constructor();
    onInteractionCreate(interaction: discord.Interaction): void;
}
