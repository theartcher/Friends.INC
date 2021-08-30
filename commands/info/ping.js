module.exports = {
    name: 'ping',
    description: 'Ping! Pong?',
    execute(client, message) {
        const delay = Date.now() - message.createdAt;
        message.reply(`**pong** *(delay: ${delay}ms)*`);
    },
};