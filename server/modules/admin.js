import dotenv from "dotenv";
export default class moduleName {
    constructor() {
        this.registerBotCommands = [
            {
                name: "admin",
            }
        ];
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
