const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'volume',
    description: `Change the client's volume`,
    aliases: ['setvolume', 'vol'],
    execute (client, message, args)  {

        let queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.')
            }
            if (!queue) {
                return message.channel.send(`There aren't any songs playing.`)
            } 
            if (!args[0]) {
                return message.channel.send(`Please provide a percentage to set the volume to.`)
            }
            if (isNaN(args[0])) {
                return message.channel.send(`Please provide a pecentage in numbers.`) 
            }
            try {
                queue.setVolume(Number(args[0]))
                message.channel.send(`Set the player's volume to ${queue.volume}%`)
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``)
            }    
    }
};