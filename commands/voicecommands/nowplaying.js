const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'nowplaying',
    description: `See the current song on player`,
    aliases: ['np', 'current'],
    execute (client, message, args)  {

        let queue = client.distube.getQueue(message);
        const status = (queue) =>
	    `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.')
            }
            if (!queue ||queue.playing === false) {
                return message.channel.send(`There aren't any songs playing.`)
            } 
            try {
                let currentSong = client.distube.getQueue(message).songs[0]
                message.channel.send(`Playing \`${currentSong.name}\` - \`${currentSong.formattedDuration}\` Time left: ${Math.round(currentSong.duration - queue.currentTime)} seconds left.\n${status(queue)}`)
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``)
            }    
    }
};