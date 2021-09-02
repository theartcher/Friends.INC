const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'autoplay',
    description: `Toggle autoplay for the client (Find new songs)`,
    aliases: ['ap'],
    execute (client, message, args)  {

        let queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.')
            }
            if (!queue) {
                return message.channel.send(`There isn't an active player.`)
            }
            try {
                queue.toggleAutoplay(message)
                message.channel.send(`Toggle autoplay: \`${queue.autoplay}\``)
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``)
                console.log(error)
            } 
    }
};
