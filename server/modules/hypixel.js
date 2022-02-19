import dotenv from "dotenv";
import { request } from "undici";
export default class hypixel {
    constructor() {
        this.registerBotCommands = [
            {
                name: "hypixel",
                description: "hypixel command",
                options: [{
                        name: "get-player",
                        description: "Get player info",
                        type: "string",
                    }]
            },
        ];
        this.hypixelApi = {
            getPlayer(playerName) {
                return request(`https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&name=${playerName}`);
            }
        };
        dotenv.config({
            path: "./../.env",
        });
    }
    onInteractionCreate(interaction) {
        if (!interaction.isCommand())
            return;
        switch (interaction.commandName) {
            case "hypixel":
                break;
        }
    }
}
