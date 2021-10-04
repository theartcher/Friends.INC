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
            client.distube.skip(message, string);
        }
        catch (error) {
            message.channel.send(`Error: \`${error}\``);
        }
     },
};