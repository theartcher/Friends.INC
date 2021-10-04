/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'loop',
    description: 'Edit the repeatmode of the current player',
    aliases: ['repeat'],
    execute(client, message, args) {

        const queue = client.distube.getQueue(message);

        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel to use this.');
        }

        if (!queue) {
            return message.channel.send('There are no items playing to loop.');
        }

        if (!args[0]) {
            return message.channel.send('Please provide a correct loop.');
        }

        if (args[0] === 'off') {
            client.distube.setRepeatMode(message, parseInt(0));
            message.channel.send('Turned off loop')
        }

        if (args[0] === 'song' || args[0] === 'single') {
            client.distube.setRepeatMode(message, parseInt(1));
            message.channel.send('Set loop to `single song` mode');
        }

        if (args[0] === 'queue' || args[0] === 'all') {
            client.distube.setRepeatMode(message, parseInt(2));
            message.channel.send('Set loop to `queue` mode');
        }

    },
};