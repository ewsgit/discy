export declare function getUserData(id: string): any;
export declare function writeUserData(id: string, userData: object): void;
export declare function getGuildData(id: string): any;
export declare function writeGuildData(id: string, guildData: object): void;
export declare function getAllData(): {
    users: {};
    guilds: {};
};
