// Don't use caps in command names
const COMMANDS = [{
    name: "help", description: "provides help on how to use the bot.",
}, {
    name: "invalid_test_command", description: "invalid command test.",
}, {
    name: "debug", description: "Debug Commands", options: [{
        name: "get-user-data",
        type: "string",
        description: "sends a message of a user's data",
        allowedValues: [{name: "a", value: "abc"},{name: "z", value: "xyz"}]
    }, {
        name: "echo-string", type: "string",
        description: "echo the string sent back to the user"
    }]
}]

export default COMMANDS