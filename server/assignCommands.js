import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import COMMANDS from "./commands.js";
import dotenv from "dotenv";
dotenv.config();
let commands = [];
COMMANDS.map((command, ind) => {
    commands.push(new SlashCommandBuilder().setName(command.name).setDescription(command.description));
});
const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
if (process.env.DEVMODE === "true") {
    rest.put(Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_DEV_SERVER), { body: commands })
        .then(() => {
        console.log("commands registered!");
    })
        .catch((err) => {
        console.error(err);
    });
}
else {
    rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), { body: commands })
        .then(() => {
        console.log("commands registered!");
    })
        .catch((err) => {
        console.error(err);
    });
}
