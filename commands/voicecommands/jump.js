/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'jump',
    description: 'Jump to an item in the queue',
    aliases: ['jp', 'j'],
    execute(client, message, args) {

        const queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.');
            }
            if (!queue) {
                // eslint-disable-next-line quotes
                return message.channel.send(`There isn't an active player.`);
            }
            if (!args[0]) {
                return message.channel.send('Please provide a position in queue to jump to');
            }
            if (isNaN(args[0])) {
                return message.channel.send('Please provide a number to jump to.');
            }
            try {

                if (queue.songs.length >= (args[0]) && (args[0] - 1) >= 1) {
                    client.distube.jump(message, (args[0] - 1));
                    message.channel.send(`Jumped to #\`${args[0]}\``);
                }
                else {
                        // eslint-disable-next-line quotes
                        return message.channel.send(`This isn't a valid position to jump to`);
                    }

            }
            catch (error) {
                // message.channel.send(`Error: \`${error}\``);
                console.log(error);
            }
    },
};