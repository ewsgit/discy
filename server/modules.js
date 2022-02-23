import fs from "fs";
import hypixel from "./modules/hypixel.js";
import developer from "./modules/developer.js";
import guildAdmin from "./modules/guildAdmin.js";
import hypixelGuild from "./modules/hypixelGuild.js";

export const Modules = [
    new hypixel,
    new developer,
    new guildAdmin,
    new hypixelGuild
];