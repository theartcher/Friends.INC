/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'play',
    description: 'Search for a link or string to stream',
    aliases: ['p'],
    execute(client, message, args) {

        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel to use this.');
        }

        const string = args.join(' ');
        client.distube.on('initQueue', queue => {
            queue.autoplay = false;
            queue.volume = 100;
        });

        if (!string) {
            return message.channel.send('Please enter a song url or query to search.');
        }
        try {
            client.distube.playVoiceChannel(message.member.voice.channel, string, { textChannel : message.channel });
        }
        catch (error) {
            message.channel.send(`${error}`);
            if (error === 'Unsupported URL' || error === 'UNAVAILABLE_VIDEO') {
                return message.channel.send('The URL is not supported, or the video is restricted.');
            }
        }
    },
};