const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'pause',
    description: 'Pause the current player',
    execute (client, message, args)  {

        let queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.')
            }
            if (!queue) {
                return message.channel.send('There is queue to pause.')
            }
            try {
                queue.pause()
                message.channel.send('Paused the queue.')
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``)
            }    
    }
};