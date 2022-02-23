import dotenv from "dotenv";
export default class guildAdmin {
    constructor() {
        this.registerBotCommands = [];
        dotenv.config({
            path: "./../.env",
        });
    }
    onInteractionCreate(interaction) {
        if (!interaction.isCommand())
            return;
        switch (interaction.commandName) {
        }
    }
}
