/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Display bot info',
    execute(client, message) {

        const helpEmbed = new MessageEmbed()
            .setColor('#CCCCFF')
            .setTitle('**The help center**')
            .setFooter('The Artcher#9289')
            .setTimestamp()
            .addFields(
                { name : client.commands },


// IN THE WORKS
            );



        if (message.channel) {
            message.channel.send();
        }
    },
};