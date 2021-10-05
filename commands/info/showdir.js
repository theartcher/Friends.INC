const botconfig = require('../../config.json');
const fs = require('fs');

module.exports = {
    name: 'showdir',
    type: 'Developer',
    // eslint-disable-next-line quotes
    description: `Shows a tree-graph of the bot's directory`,
    cooldown: 1,
    execute(client, message, args) {

        if(!args[0]) {
            return message.channel.send('You must provide a folder.');
        }

        if(!botconfig.developerids.includes(message.author.id)) {
            return message.channel.send('Developer unconfirmed, access denied.');
        }

        const folder = args[0].toLowerCase();
        const directory = fs.readdirSync(`./commands/${folder}`);
        const arrayNewline = directory.join('\r\n');

        message.channel.send(
            `**${folder}**\n\n${arrayNewline}`,
        );
    },
};