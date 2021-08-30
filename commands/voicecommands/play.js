const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'play',
    description: 'Play music hoe',
    execute (client, message, args)  {


    if (!message.member.voice.channel) {
        return message.channel.send('You must be in a voice channel to use this.')
    }
        
    const string = args.join(" ")
    client.distube.on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
    });

    //Send embed on when next song is active

    
    if (!string) {
        return message.channel.send(`Please enter a song url or query to search.`)
    }
    try {
        client.distube.play(message, string)
    } catch (error) {
        message.channel.send(`Error: \`${error}\``)
    }
    
}};










//const ytdl = require("discord-ytdl-core");
//let queue = [];



// contentInput = message.content.split(' ')
// console.log(contentInput)

// if (message.author.bot || !message.guild) return;

// if (contentInput[0] === "!play") {
//     if (!message.member.voice.channel) {
//         message.channel.send("You're not in a voice channel?");
//     }

//     queue.push(contentInput[1])
//     console.log(queue)
    
//     let stream = ytdl(queue[0], {
//         filter: "audioonly",
//         opusEncoded: true,
//     });
//     message.channel.send('Added to the queue!')

// message.member.voice.channel.join()
//     .then(connection => {
//         let dispatcher = connection.play(stream, {
//             type: "opus"
//         })
//         .on("finish", () => {
//             queue.shift()
//             if (queue.length >= 1) {

//             }
//             else {
//                 message.guild.me.voice.channel.leave();
//             }
//         })
//     })
// }