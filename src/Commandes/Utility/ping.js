module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! La latence est ${msg.createdTimestamp - message.createdTimestamp}ms. l'API Latency est ${Math.round(bot.ping)}ms`);
  };


module.exports.help = {
    name: "ping",
    category: "utility",
    aliases: "",
    description: "Connaitre le ping du bot",
    usage: "ping"
  };
