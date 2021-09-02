const config = require("../../config.json");
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'effect',
    description: 'Turn on/off voice effects',
    execute (client, message, args)  {

        const command = args.shift();
        let queue = client.distube.getQueue(message);

        if (!command) {
            message.channel.send(`You must provide an effect;\n 3d, bassboost, echo, karaoke, nightcore, vaporwave, reverse\n flanger, gate, mcompand, phaser, tremolo, earwax `)
        }
        if (!message.content.startsWith(config.prefix)) {
            return;
        }
        if (!queue) {
            return message.channel.send('There are no items playing to add effects to.')
        }
        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`,`reverse`,`flanger`,`gate`,`mcompand`,`phaser`,`tremolo`,`earwax`].includes(command)) {
            try {
                let filter = client.distube.setFilter(message, command);

                if (filter.length <= 0) {
                    message.channel.send("Current queue filter: Off")
                }
                if (filter.length >= 1) {
                    message.channel.send("Current queue filter: " + (filter));
                }
            }
            catch (error) {
                console.log(error)
                message.channel.send(`Error: \`${error}\``)
            }
        };
    }    
};