module.exports = {
    name: 'ping',
    description: 'Ping! Pong?',
    execute(client, message) {
        const delay = message.createdAt - Date.now();
        message.reply(`**pong** *(delay: ${delay}ms)*`);
    },
};