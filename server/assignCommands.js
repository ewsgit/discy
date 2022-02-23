import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import COMMANDS from "./commands.js";
import { Modules } from "./modules.js";
dotenv.config();
let ALLCOMMANDS = [];
COMMANDS.map(command => {
    ALLCOMMANDS.push(command);
});
Modules.map(module => {
    if (module.registerBotCommands) {
        module.registerBotCommands.map(mod => {
            ALLCOMMANDS.push(mod);
        });
    }
});
let commands = [];
ALLCOMMANDS.map((command, ind) => {
    let out = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description);
    if (command.options) {
        command.options.map(option => {
            switch (option.type) {
                case "string":
                    out.addStringOption(opt => {
                        let obj = opt;
                        obj.setName(option.name);
                        obj.setDescription(option.description);
                        if (option.allowedValues) {
                            option.allowedValues.map(allowedVal => {
                                obj.addChoice(allowedVal.name, allowedVal.value);
                            });
                        }
                        return obj;
                    });
                    break;
                case "number":
                    out.addIntegerOption(opt => {
                        let obj = opt.setName(option.name);
                        obj.setDescription(option.description);
                        if (option.allowedValues) {
                            option.allowedValues.map(allowedVal => {
                                obj.addChoice(allowedVal.name, allowedVal.value);
                            });
                        }
                        return obj;
                    });
                    break;
                default:
                    console.error("invalid module option type: " + option.type);
            }
        });
    }
    commands.push(out);
});
const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
if (process.env.DEVMODE === "true") {
    rest
        .put(Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_DEV_SERVER), { body: commands })
        .then(() => {
        console.log("commands registered!");
    })
        .catch(err => {
        console.log(err);
    });
}
else {
    rest
        .put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), {
        body: commands,
    })
        .then(() => {
        console.log("commands registered!");
    })
        .catch(err => {
        console.error(err);
    });
}
