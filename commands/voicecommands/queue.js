const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'queue',
    description: 'Show what is currently playing',
    aliases: ["q"],
    execute (client, message, args)  {

        const string = args.join(" ")
        let queue = client.distube.getQueue(message);

            if (!message.member.voice.channel) {
                return message.channel.send('You must be in a voice channel to use this.')
            }
            try {
                 message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                   `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                ).slice(0, 10).join("\n"));
            }
            catch (error) {
                message.channel.send(`Error: \`${error}\``)
            }    
    }
};