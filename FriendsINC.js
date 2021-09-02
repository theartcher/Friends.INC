const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const { SpotifyPlugin } = require("@distube/spotify");
const client = new Discord.Client()
const DisTube = require("distube")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()
client.distube = new DisTube.default(client, {
		searchSongs: 10,
		emitNewSongOnly: true,
		plugins: [new SpotifyPlugin()],
	  });
	  
//Construct the different folders and define them

const infoCommands = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));

for (const file of infoCommands) {
    const command = require(`./commands/info/${file}`);
	client.commands.set(command.name, command);
	if (command.aliases) {
		command.aliases.forEach(alias => {
			client.aliases.set(alias, command)
		})
	}
}

const voicecommands = fs.readdirSync('./commands/voicecommands').filter(file => file.endsWith('.js'));

for (const file of voicecommands) {
    const command = require(`./commands/voicecommands/${file}`);
    client.commands.set(command.name, command);
	if (command.aliases) {
		command.aliases.forEach(alias => {
			client.aliases.set(alias, command)
		})
	}
}

const funCommands = fs.readdirSync('./commands/fun').filter(file => file.endsWith('.js'));

for (const file of funCommands) {
    const command = require(`./commands/fun/${file}`);
    client.commands.set(command.name, command);
	if (command.aliases) {
		command.aliases.forEach(alias => {
			client.aliases.set(alias, command)
		})
	}
}

//Try execute on command(message)


client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) {
		return;
	}
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command) && !client.aliases.has(command)) {
		return;
	}

	try {
		const commandFinal = client.commands.get(command) || client.aliases.get(command) 
		commandFinal.execute(client, message, args);
    }
	
    catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!' + '\n Error: ' + error);
	}
});



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


//Used to initiate distube client update messages, must remain here.

const status = (queue) =>
	`Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;


client.distube
	.on("playSong", (queue, song) => queue.textChannel.send(
		`Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
	))
	.on("addSong", (queue, song) => queue.textChannel.send(
		`Added ${song.name} - \`${song.formattedDuration}\` to the queue`
	))
	.on("addList", (queue, playlist) => queue.textChannel.send(
		`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
	));

  client.login(config.token);