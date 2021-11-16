module.exports = {
    name: 'stop',
    description: 'Stop whatever is playing',
    aliases: ['leave'],
    // eslint-disable-next-line no-shadow
    execute(client, message) {

        if (!message.member.voice.channel) {
            return message.channel.send('You must be in a voice channel to use this.');
        }
        try {
            client.distube.stop(message);
            message.channel.send('Stopped the queue!');
        }
        catch (error) {
            message.channel.send(`Error: \`${error}\``);
        }
    },
};