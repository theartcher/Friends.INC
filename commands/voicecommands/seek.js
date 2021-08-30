const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'seek',
    description: 'Search for a different position in the current song',
    execute (client, message, args)  {

    if (!message.member.voice.channel) {
        return message.channel.send('You must be in a voice channel to use this.')
    }
    if (!args[0]) {
        return message.channel.send(`Please provide a time position to seek to.`)
    }
    if (isNaN(args[0])) {
        return message.channel.send(`Please provide a number in seconds.`) 
    }
    try {
        let newPosition = args[0]*1000
            client.distube.seek(message, Number(newPosition))
    }
    catch (error) {
        message.channel.send(`Error: \`${error}\``)
    }    
    
}};