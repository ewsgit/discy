import discord from "discord.js";
export default class hypixel {
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
    hypixelApi: {
        getPlayer(playerName: string): void;
    };
    onInteractionCreate(interaction: discord.Interaction): void;
}
