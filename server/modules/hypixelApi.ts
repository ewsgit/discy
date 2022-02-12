import discord from "discord.js";

export default class hypixelApi {
    client: discord.Client;
    constructor(client) {
        this.client = client;
    }
    interactionCreate(interaction) {
    }
}