module.exports = {
    name: 'id',
    description: 'Display tagged user info',
    execute(message) {
        if (!message.mentions.members.first()) {
            message.reply('missing a user mention.');
        }

        else{
        message.reply(`requested ID; *${message.mentions.users.first().id}*`);
         }
    },
};