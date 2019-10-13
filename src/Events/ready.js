const { statusTYPE, prefix } = require('../config');

module.exports = async (bot) => {

    var Clientonmessage = `Bot Activity On !`
    console.log(Clientonmessage);

    let statusArray = [
        `${prefix}help | ${bot.guilds.size} Servers!`,
        `${prefix}help | ${bot.users.size} Users!`
    ];

    setInterval(function() {
        bot.user.setActivity(`${statusArray[~~(Math.random() * statusArray.length)]}`, { type: statusTYPE });
    }, 11000);
}