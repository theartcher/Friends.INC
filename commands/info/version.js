const time = Date()

module.exports = {
	name: 'version',
	description: 'Check bot version',
	execute(client, message, args) {
		message.channel.send(`We are currently running; **Friends.inc Alpha Release**, which started at **${time}**`);
	},
};
