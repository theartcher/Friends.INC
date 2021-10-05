const Discord = require('discord.js');
// eslint-disable-next-line no-unused-vars
const client = new Discord.Client();

module.exports = {
    name: 'autoplay',
    description: 'Toggle autoplay for the client (Find new songs)',
    aliases: ['ap'],
    // eslint-disable-next-line no-shadow
    execute(client, message) {

        const queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.');
            }
            if (!queue) {
                // eslint-disable-next-line quotes
                return message.channel.send(`There isn't an active player.`);
            }
            try {
                queue.toggleAutoplay(message);
                message.channel.send(`Toggle autoplay: \`${queue.autoplay}\``);
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``);
                console.log(error);
            }
    },
};
