const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const DisTube = require("distube")
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: false })

//Construct the different folders and define them

const infoCommands = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));

for (const file of infoCommands) {
    const command = require(`./commands/info/${file}`);
	client.commands.set(command.name, command);
}

const voicecommands = fs.readdirSync('./commands/voicecommands').filter(file => file.endsWith('.js'));

for (const file of voicecommands) {
    const command = require(`./commands/voicecommands/${file}`);
    client.commands.set(command.name, command);
}

const funCommands = fs.readdirSync('./commands/fun').filter(file => file.endsWith('.js'));

for (const file of funCommands) {
    const command = require(`./commands/fun/${file}`);
    client.commands.set(command.name, command);
}

//Set presences in console.logs and client

client.on("ready", () => {
	const time = Date()
	client.user.setPresence({ activity: { name: `No runnin' in da halls` }, status: 'online' })
 		.catch(console.error);
	console.log(`Ready for operating, started at ${time}`);
}); 

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnected!');
});

//Try execute on command(message)

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) {
		return;
	}
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {
		return;
	}

	try {
		client.commands.get(command).execute(client, message, args);
    }
	
    catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


//Used to initiate distube client update messages, must remain here.

client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`
    ))

  client.login(config.token);