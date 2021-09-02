const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the current queue',
    aliases: ['randomise'],
    execute (client, message, args)  {

        let queue = client.distube.getQueue(message);

        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel to use this.')
        }
        if (!queue) {
            return message.channel.send('There are no songs to shuffle')
        }
        try {
           queue.shuffle()
           message.channel.send('The queue has been shuffled.')
        }
        catch (error) {
            message.channel.send('Error:\n'`${error}`)
        }    
    }
};