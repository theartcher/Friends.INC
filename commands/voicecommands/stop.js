const config = require("../../config.json");
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'stop',
    description: 'Stop whatever is playing',
    execute (client, message)  {

        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel to use this.')
        }
        if (client.distube.isPlaying = false)
        {
            message.channel.send(`The current player is empty.`)
            return
        }
        
        if (client.distube.isPlaying = true) {
            client.distube.stop(message);
            message.channel.send("Stopped the queue!");  
        }
    }
};