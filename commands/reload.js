const botconfig = require("../config.json");

module.exports = {
    name: 'reload',
    type: "Developer",
    description: 'Reloads a command (developer only)',
    cooldown: 1,
    execute(message, args) {
        if(!botconfig.developerids.includes(message.author.id)) return message.channel.send("Only my developer can use this command...");
        message.channel.send("Developer command confirmed!");

        if (!args.length) return message.channel.send(`You didn't pass any command to reload!`);
        const commandName = args[0].toLowerCase();

        if(message.client.commands.get(commandName)){
            const command = message.client.commands.get(commandName) ||
            message.client.commands.find(command => command.aliases && command.aliases.includes(commandName));

            if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

            delete require.cache[require.resolve(`./${command.name}.js`)];
        }

        try {
            const newCommand = require(`./${commandName}.js`);
            message.client.commands.set(commandName, newCommand);
            message.channel.send("Command `" + commandName+ "` was reloaded!");
        } catch (error) {
            console.log(error);
            message.channel.send("There was an error while reloading the `" + botconfig.prefix + commandName + "` command. \n\nError is as follows:\n``${error.message}`");
        }
    },
};