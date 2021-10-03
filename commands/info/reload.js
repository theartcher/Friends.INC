const botconfig = require('../../config.json');

module.exports = {
    name: 'reload',
    type: 'Developer',
    description: 'Reloads a command (developer only)',
    cooldown: 1,
    execute(client, message, args) {

        if(!botconfig.developerids.includes(message.author.id)) {
            return message.channel.send('Developer unconfirmed, access denied.');
        }
        message.channel.send('Developer command confirmed!');

        if (!args) {
            // eslint-disable-next-line quotes
            return message.channel.send(`You didn't pass any command to reload!`);
        }
        const commandName = args[0].toLowerCase();

        if(message.client.commands.get(commandName)) {
            const command = message.client.commands.get(commandName) ||
            // eslint-disable-next-line no-shadow
            message.client.commands.find(command => command.aliases && command.aliases.includes(commandName));

            // works to here

            if (!command) {
                return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
            }
            delete require.cache[require.resolve(`./${commandName}.js`)];
        }

        try {
            const newCommand = require.resolve(`./${commandName}.js`);
            message.client.commands.set(commandName, newCommand);
            message.channel.send('Command `' + commandName + '` was reloaded!');
            console.log(client.commands);
        }
        catch (error) {
            console.log(error);
            message.channel.send('There was an error while reloading the' + botconfig.prefix + commandName + ' command. \n\nError is as follows:\n'`${error.message}`);
        }
    },
};
