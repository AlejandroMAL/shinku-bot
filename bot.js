const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
	if (!message.content.startsWith("!") || message.author.bot) return;

	const args = message.content.slice("!".length).trim().split('/ +/');
	const command = args.shift().toLowerCase();

	if (command === "agenda") {
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	} else if (command === 'scrims') {
		message.reply("Tenemos scrim hoy Miercoles a las 7pm 🔥 🐉 vs Naguara Gaming!");
	}
});

// client.on('interaction', async (interaction) => {
// 	if (!interaction.isCommand()) return;
// 	if (interaction.commandName === 'ping') { 
// 		await interaction.reply('Pong!');
// 	}
// });
