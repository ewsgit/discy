import discord from "discord.js";
export default class moduleName {
    client: discord.Client;
    registerBotCommands: {
        name: string;
        description: string;
        options: {
            name: string;
            description: string;
            type: string;
            allowedValues: {
                name: string;
                value: string;
            }[];
        }[];
    }[];
    constructor();
    onInteractionCreate(interaction: discord.Interaction): void;
}
