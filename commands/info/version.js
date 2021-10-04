const time = Date();

module.exports = {
	name: 'version',
	description: 'Check bot version',
	execute(client, message) {
		message.channel.send(`We are currently running; **Friends.inc Alpha Release**, which started at **${time}**`);
	},
};
