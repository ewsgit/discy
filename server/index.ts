import chalk from "chalk";
import discord from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import "./assignCommands.js";
import COMMANDS from "./commands.js";
import { Modules } from "./modules.js";
import * as database from "./database.js";
dotenv.config();

const client = new discord.Client({
  intents: [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.DIRECT_MESSAGES,
  ],
});
let loadedModules = [];

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

client.once("ready", () => {
  console.log(
    chalk.green.bold(`logged in as ` + chalk.white.bold(client.user.tag))
  );
  Modules.map(module => {
    module.client = client;
    loadedModules.push(module);
  });
  // check if database is setup
  // if not, setup database
  if (!fs.existsSync("./database/guilds")) {
    fs.mkdir("./database/guilds/", err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  }
  if (!fs.existsSync("./database/users")) {
    fs.mkdir("./database/users/", err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  }

  setInterval(() => {
    client.user.setActivity(
      `${client.guilds.cache.size} servers | ${client.users.cache.size} users`,
      { type: "WATCHING" }
    );
  }, 10000);
});

client.on("guildMemberRemove", member => {
  let data = database.getGuildData(member.guild.id)
  data.members.map(member => {
    if (member.id === member.id) {
      delete member.id
    }
  })
  database.writeGuildData(member.guild.id, data)
})

client.on("interactionCreate", (interaction: discord.Interaction) => {
  if (!database.getGuildData(interaction.guild.id))
    database.writeGuildData(interaction.guild.id, {
      users: [interaction.user.id],
    });
  if (!database.getUserData(interaction.user.id))
    return database.writeUserData(
      interaction.user.id,
      fs.readFileSync("./database/defaultUserData.txt")
    );
  // execute all functions inside modules called onInteractionCreate
  loadedModules.map(module => {
    if (module.onInteractionCreate) {
      module.onInteractionCreate(interaction);
    }
  });
  // check if the interaction is a command
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    // assign basic commands
    case "help":
      let embed = new discord.MessageEmbed();
      embed.setColor("#1da464");
      embed.setTitle("Discy Help");
      COMMANDS.map(command => {
        embed.addField(command.name, command.description, false);
      });
      interaction.reply({ embeds: [embed] });
      break;
    case "debug":
      if (interaction.options.getString("echo-string")) {
        return interaction.reply(interaction.options.getString("echo-string"));
      }
      break;
  }
  // check if commandName is in ALLCOMMANDS if not return
  if (!ALLCOMMANDS.find(command => command.name === interaction.commandName)) {
    interaction.reply("...this command does not exist?").then(() => {
      setTimeout(() => {
        interaction
          .editReply(
            "it appears that an error has occurred, please notify a developer here: https://discord.gg/Njb5sGAEsJ"
          )
          .catch(err => {
            if (err) console.log(err);
          });
      }, 5000);
    });
  }
});

client.login(process.env.BOT_TOKEN).catch(err => {
  console.log(err);
});

process.addListener("beforeExit", code => {
  console.log("Exiting with code: " + code);
  console.log(chalk.redBright(":^("));
});
