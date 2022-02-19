import fs from "fs";

// export the default function Modules which returns a promsie with an array of modules from the ./modules folder (all modules ending in .js)
export default function Modules() {
    return new Promise((resolve, reject) => {
        fs.readdir("./modules", async (err, files) => {
            if (err) {
                reject(err);
            } else {
                let modules = [];
                await files.forEach(file => {
                    if (file.endsWith(".js")) {
                        let mod = import(`./${file}`)
                        mod = mod.default;
                        modules.push(mod);
                    }
                });
                resolve(modules);
            }
        });
    });
}