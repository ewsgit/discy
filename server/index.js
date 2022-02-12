import chalk from "chalk";
import discord from "discord.js";
import dotenv from "dotenv";
import "./assignCommands.js";
import COMMANDS from "./commands.js";
dotenv.config();
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.DIRECT_MESSAGES] });
client.once("ready", () => {
    console.log(chalk.green.bold(`logged in as ` + chalk.white.bold(client.user.tag)));
});
client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand())
        return;
    switch (interaction.commandName) {
        case "help":
            let embed = new discord.MessageEmbed;
            embed.setColor("#1da464");
            embed.setTitle("Discy Help");
            COMMANDS.map((command) => {
                embed.addField(command.name, command.description, false);
            });
            interaction.reply({ embeds: [embed] });
            break;
        default:
            interaction.reply("...this command does not exist?").then(() => {
                setTimeout(() => {
                    interaction.editReply("it appears that an error has occurred, please notify a developer here: https://discord.gg/Njb5sGAEsJ").catch(err => {
                        if (err)
                            console.log(err);
                    });
                }, 5000);
            });
    }
});
client.login(process.env.BOT_TOKEN).catch(err => {
    console.log(err);
});
