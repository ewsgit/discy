import discord from "discord.js";
export default class hypixel {
    client: discord.Client;
    registerBotCommands: {
        name: string;
        description: string;
    }[];
    interactionCreate(interaction: any): void;
}
