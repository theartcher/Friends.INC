const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on("ready", () => {
	const time = Date()
	client.user.setPresence({ activity: { name: `No runnin' in da halls` }, status: 'online' })
 		.catch(console.error);
	console.log(`Ready for operating, started at ${time}`);
  });


client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
    }
    catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});



  client.login(config.token);