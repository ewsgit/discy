import fs from "fs";

export function getUser(id: string) {
    if (fs.existsSync(`./database/users/${id}.json`)) {
        return JSON.parse(fs.readFileSync(`./database/users/${id}.json`).toString())
    } else {
        fs.writeFileSync(`./database/users/${id}.json`, "{}")
        return {}
    }
}

export function writeUser(id: string, userData: object) {
    fs.writeFile(`./database/users/${id}.json`, JSON.stringify(userData), err => {
        if (err) {
            console.error(err)
        }
    })
}

export function getGuild(id: string) {
    if (fs.existsSync(`./database/guilds/${id}.json`)) {
        return JSON.parse(fs.readFileSync(`./database/guilds/${id}.json`).toString())
    } else {
        fs.writeFileSync(`./database/guilds/${id}.json`, "{}")
        return {}
    }
}

export function writeGuild(id: string, guildData: object) {
    fs.writeFile(`./database/guilds/${id}.json`, JSON.stringify(guildData), err => {
        if (err) {
            console.error(err)
        }
    })
}