// fait npm install, Dans ton terminal avant de lancer ton bot 
//-------------------------------------------------------------


const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const fs = require('fs');
// nous avons besoin du fichier de configuration
const config = require("./src/config");

// Création d'une instance de client.
const bot = new Client();

// Attacher Config à bot pour qu'il soit accessible n'importe où.
bot.config = config;

// Création d'une collection de commandes et d'alias.
["commands", "aliases"].forEach(x => bot[x] = new Collection());

// Une fonction pour charger toutes les commandes.
const load = (dir = "./src/Commandes/") => {

	readdirSync(dir).forEach(dirs => {
// nous lisons le répertoire des commandes pour les sous-dossiers et filtrons les fichiers avec le nom portant l'extension .js
		const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

// on utilise for pour obtenir toutes les commandes dans un sous-répertoire
		for (const file of commands) {
// Nous faisons un pull vers ce fichier pour pouvoir l'ajouter à la collection bot.commands
			const pull = require(`${dir}/${dirs}/${file}`);
// on vérifie ici si le nom de la commande ou la catégorie de la commande est une chaîne ou non, ou on vérifie leur existence
			if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
				if (bot.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}.`);
// nous ajoutons la commande à la collection, Map.prototype.set () pour plus d'informations
				bot.commands.set(pull.help.name, pull);
// on se connecte si la commande a été chargée.
				console.log(`${success} Loaded command ${pull.help.name}.`);

			}
			else {
// on vérifie si la commande est chargée, sinon on génère une erreur disant qu'il y avait une commande qu'elle n'a pas chargée
				console.log(`${error} Error loading command in ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);
// nous utilisons continuer à charger d'autres commandes sinon cela s'arrêtera ici
				continue;
			}
// on vérifie si la commande a des alias, on l'ajoute donc à la collection
			if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
				pull.help.aliases.forEach(alias => {
// nous vérifions s'il y a un conflit avec d'autres alias ayant le même nom
					if (bot.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases ${alias}`);
					bot.aliases.set(alias, pull.help.name);
				});
			}
		}

	});
};

fs.readdir('./src/Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./src/Events/${f}`);
            let event = f.split('.')[0];
            bot.on(event, events.bind(null, bot));
        });
});


load();

bot.on("message", async message => {

	const prefix = bot.config.prefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command;

	if (message.author.bot || !message.guild) return;

// Si le message.member n'est pas mis en cache, message.member peut renvoyer null.
// Cela empêche que cela se produise.
	if (!message.member) message.member = await message.guild.fetchMember(message.author);

	if (!message.content.startsWith(prefix)) return;

	if (cmd.length === 0) return;
	if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
	else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

	if (command) command.run(bot, message, args);
});

bot.login(bot.config.TOKEN).catch(console.error());
