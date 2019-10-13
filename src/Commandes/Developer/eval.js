const config = require('../../config');

module.exports.run = function(client, message, args){
// COMMANDE TRÈS DANGEREUSE !

// Exécute Javascript et affiche le résultat sur le chat.
	if (message.author.id === config.ownerID);
	
	try {
		let code = args.join(" ");
		if(code.startsWith("```js")) code = code.replace("```js", "");
		if(code.endsWith("```")) code = code.replace("```", "");
		
		let evaled = eval(code);

		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

		message.channel.send(evalClean(evaled), {code:"xl", split:true});
		
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${evalClean(err)}\n\`\`\``);
	}
	
	function evalClean(text) {
		if (typeof(text) === "string"){
			text = text.replace(client.token, "[REDACTED]");
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		}
		else
			return text;
	}
};

module.exports.help = {
    name: "eval",
    category: "Developper",
    aliases: "",
    description: "None",
    usage: "eval"
  };
