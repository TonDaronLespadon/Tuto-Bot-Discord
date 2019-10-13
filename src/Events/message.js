const prefix  = require('../config.js');

module.exports = async (bot, msg, args) => {

    if (msg.author.bot || msg.channel.type === 'dm') { return; }
    if (!msg.channel.permissionsFor(bot.user).has('SEND_MESSAGES')) { return; }

    if(!msg.content.startsWith(prefix)) return;
    var args = msg.content.substring(prefix.length).split(" ");
    var cmdName = args[0].toLowerCase();

    bot.commands.forEach(command => {
        if(cmdName === command.help.name || command.help.alias.includes(cmdName)){
        }
    })
}
