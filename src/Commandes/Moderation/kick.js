const Discord = require('discord.js');
const config = require('../../config');

module.exports.run = async (bot, message, args) => {
  try {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick(args.slice(1).join(' ')).then(() => {
          message.reply(`Successfully kicked ${user.tag}`);

          const modLogChannel = config.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.id === config.modLogChannel)) {
            let embed = new Discord.RichEmbed()
            .setTitle('User Ban')
            .setColor('#2a57eb')
            .setDescription(`Name: **${user.username}**\nID: ${user.id}\nReason: ${args.slice(1).join(' ')}\nModerator: **${message.author.username}**`);

            message.guild.channels.find(c => c.id === config.modLogChannel).send(embed).catch(console.error);        
          }
        }).catch(err => {
          message.reply('Je n\'ai pas pu donner un coup de pied au membre');
        });
      } else {
        message.reply('Cet utilisateur ne fait pas partie de ce serveur!');
      }
    } else {
      message.reply('Vous n\'avez pas mentionné l\'utilisateur à KICK!');
    }
  } catch (err) {
    message.channel.send('Il y avait une erreur\n' + err).catch();
  }
};


module.exports.help = {
  name: 'kick',
  category: 'modo',
  aliases: "",
  description: 'Kicks the specified member.',
  usage: 'kick @<user> [reason]'
};
