/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'resume',
    description: 'Resume the current player',
    execute(client, message, args) {

        const string = args.join(' ');
        const queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.');
            }
            if (!queue) {
                return message.channel.send('There aren\'t any songs playing.');
            }
            try {
                queue.resume();
                message.channel.send('Resumed the player.');
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``);
            }
    },
};