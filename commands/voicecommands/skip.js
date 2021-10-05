/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();
const DisTube = require('distube');

module.exports = {
    name: 'skip',
    description: 'skip some shit',
    execute(client, message, args) {

        const string = args.join(' ');
        const queue = client.distube.getQueue(message);

        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel to use this.');
        }
        if (!queue || queue.length <= 1) {
            return message.channel.send('There are no other items in the queue to skip to.');
        }
        try {
            if (queue.songs.length >= 2) {
                client.distube.skip(message, string);
                message.channel.send('Skipped! 📣')
                    .then(message => {
                        setTimeout(() => message.delete(), 5000);
                    });
            }
            else {
                // eslint-disable-next-line quotes
                return message.channel.send(`There aren't any songs to jump to.`);
            }
        }
        catch (error) {
            message.channel.send(`Error: \`${error}\``);
        }
     },
};