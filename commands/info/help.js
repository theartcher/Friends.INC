/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Display bot info',
    execute(client, message) {

        const helpEmbed = new MessageEmbed()
            .setColor('0x0ff1f1')
            .setTitle('All commands')
            .setDescription('Here you can find all our (listed) working commands.')
            .addField('Voice Commands', 'autoplay, effect, jump, loop, nowplaying, pause, play, queue, resume, seek, shuffle, skip, stop, volume', false)
            .addField('Regular Commands', 'id, ping, help, version, who', false)
            .setTimestamp();

            message.channel.send(helpEmbed);

    },
};