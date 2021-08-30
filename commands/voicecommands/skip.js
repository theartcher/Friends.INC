const Discord = require('discord.js');
const client = new Discord.Client();
const DisTube = require('distube')

module.exports = {
    name: 'skip',
    description: 'skip some shit',
    execute (client, message, args)  {

            const string = args.join(" ")

                if (!message.member.voice.channel) {
                    return message.channel.send('You must be in a voice channel to use this.')
                }
                try {
                    client.distube.skip(message, string)
                } catch (error) {
                    message.channel.send(`Error: \`${error}\``)
                }    
        
}};
