const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const config = require('../../config');

module.exports.run = (bot, message, args) => {

	let prefix = config.prefix;
    if (args[0]) {
        let command;

        if (bot.commands.has(args[0])) command = bot.commands.get(args[0]);
        
        if (bot.aliases.has(args[0])) command = bot.commands.get(bot.aliases.get(args[0]));

        
        let embed = new Discord.RichEmbed()
            .setTitle(`Command: \`\`${command.help.name}\`\``)
            .setColor('PURPLE')
            .setFooter(`Tous les paramètres comportant des flèches <> sont obligatoires.`)            
            .addField('Description', command.help.description)
            .addField('Aliases', command.help.aliases.length > 0 ? command.help.aliases.join(", ") : "No Aliases")
            .addField('Description', command.help.description)
            .addField('Parameters (Usage)', command.help.usage);
            

        return message.channel.send(embed);
	};
	
    var utilityCommands = "";
    var modoCommands = "";

    if (!message.author.bot) {
      
    bot.commands.forEach(command => {
        switch(command.help.category){
                case "utility":
                utilityCommands += `\`\`${command.help.name}\`\`, `;
                break;
            
            case "modo":
                modoCommands += `\`\`${command.help.name}\`\`, `;
                break;
        }
	});
	
    let avatars = bot.user.displayAvatarURL;

    var helpsembed = new Discord.RichEmbed()
		.setColor("#1d78f0")
		.setThumbnail(avatars)
        .setTitle('Commandes List')
        .setDescription(`Le prefix du bot est: \`\`${prefix}\`\``)
        .addField("💬 Utility", `${utilityCommands}` ,true)
        .addField("⚙️ Moderation",`${modoCommands}`, true)
        .setFooter(`Faite ${prefix}help <command> pour plus d'information.`)
        message.channel.send(helpsembed);
	  }
};

exports.help = {
	name: "help",
	aliases: "",
	description: "Affiche toutes les commandes disponibles.",
	usage: "help [command]",
	category: "utility"
};