import fs from "fs";
export function getUserData(id) {
    if (fs.existsSync(`./database/users/${id}.json`)) {
        return JSON.parse(fs.readFileSync(`./database/users/${id}.json`).toString());
    }
    else {
        fs.writeFileSync(`./database/users/${id}.json`, "{}");
        return {};
    }
}
export function writeUserData(id, userData) {
    fs.writeFile(`./database/users/${id}.json`, JSON.stringify(userData), err => {
        if (err) {
            console.error(err);
        }
    });
}
export function getGuildData(id) {
    if (fs.existsSync(`./database/guilds/${id}.json`)) {
        return JSON.parse(fs.readFileSync(`./database/guilds/${id}.json`).toString());
    }
    else {
        fs.writeFileSync(`./database/guilds/${id}.json`, "{}");
        return {};
    }
}
export function writeGuildData(id, guildData) {
    fs.writeFile(`./database/guilds/${id}.json`, JSON.stringify(guildData), err => {
        if (err) {
            console.error(err);
        }
    });
}
export function getAllData() {
    let out = {
        users: {},
        guilds: {},
    };
    fs.readdirSync("./database/users").forEach(file => {
        out.users[file.split(".")[0]] = JSON.parse(fs.readFileSync(`./database/users/${file}`).toString());
    });
    fs.readdirSync("./database/guilds").forEach(file => {
        out.guilds[file.split(".")[0]] = JSON.parse(fs.readFileSync(`./database/guilds/${file}`).toString());
    });
    return out;
}
