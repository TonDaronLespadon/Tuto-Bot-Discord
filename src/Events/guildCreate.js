module.exports = async (bot, guild) => {
    console.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  
    const logsGuildID = ("ID DE TON CHANNEL");
    const logsServerJoin = bot.channels.get(logsGuildID);
    
    logsServerJoin.send({embed: {
    color: 0x2499fA,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    fields: [{
        name: '**Le Bot à rejoint:**',
        value: `${guild.name} `
      },
      {
        name: '**Nombre de membres**:',
        value: `${guild.memberCount}`,
    },
    {
        name: 'Appartenant à:',
        value: `${guild.owner.user.username}`,
    },
    ],
    timestamp: new Date(),
    footer: {
      text: "©"
          }
        }
        })
       }
