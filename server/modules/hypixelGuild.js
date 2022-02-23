import dotenv from "dotenv";
export default class hypixelGuild {
    constructor() {
        this.registerBotCommands = [
            {
                name: "verifyguild",
                description: "verify that you are in the guild",
                options: [
                    {
                        name: "username",
                        description: "your username",
                        type: "string",
                    },
                ],
            },
        ];
        dotenv.config({
            path: "./../.env",
        });
    }
    onInteractionCreate(interaction) {
        if (!interaction.isCommand())
            return;
        switch (interaction.commandName) {
            case "verifyguild":
                if (interaction.options.getString("username")) {
                    // user has entered a username
                    // check if the user is in the guild
                    // if they are, send them a message
                    // if they are not, send them a message
                }
                else {
                    interaction.reply("No username specified!");
                }
        }
    }
}
