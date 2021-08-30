const Discord = require("discord.js");

module.exports = {
    name: 'who',
    description: 'Display tagged user info',
    execute(client, message, args) {
            if (!args) {
                message.reply('You need to mention a user.')
                return
            }

            try {

                let mentionedUser = message.mentions.users.first()
                let userTag = mentionedUser.tag
                let userID = mentionedUser.id
                let userCreationDate = mentionedUser.createdAt
                let userCreationTime = Math.round((Date.now() - mentionedUser.createdTimestamp)/(1000*60*60*24*12))
                const whoEmbed = new Discord.MessageEmbed()
                    .setColor('#47f598')
                    .setTitle(userTag)
                    .setImage(mentionedUser.avatarURL())
                    .addField(`User info`,`**User ID>** ${userID} \n **Account creation date>** ${userCreationDate}`)
                    .addField(`Account creation date`,`${userCreationDate}`)
                    .addField(`Account age`,`${userCreationTime} months old`)
                    


                message.channel.send(whoEmbed)
            }
            

            catch (error) {
                message.reply(`An error occured during this command!`)
                console.error(error)
            }
    }
};









// if (message.content.startsWith('s!who')) {
// 		if (!message.mentions.members.first(

// 		))
// 		if (message.content.startsWith = 's!whomst'){
// 			return
// 		}
// 		else
// 			return message.channel.send(errorGif);
// 		let member = message.mentions.users.first()
// 		var userID = member.id
// 		var userTag = member.tag
// 		var userCreationDate = member.createdAt
// 		let creationTimeStamp = message.createdTimestamp
// 		const idEmbed = new Discord.RichEmbed()
// 			.setColor('#47f598')
// 			.setTitle(`User '` + userTag + `'`)
// 			.addField(`Their ID`, userID)
// 			.addField(`Account creation date`, userCreationDate)
// 			.setTimestamp(creationTimeStamp)
// 			.addBlankField()
// 			.setImage(`${message.mentions.users.first().displayAvatarURL}`)
// 			.setFooter('Seradys Beta V1.5.8', 'https://cdn.discordapp.com/attachments/648628577935294470/666638160608100352/firegreenedit1.png')
// 		message.channel.send(idEmbed);
// 	}
// })