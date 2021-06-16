const Discord = require('discord.js');
const client = new Discord.Client();

require("dotenv").config();

client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', (message) => { 
    console.log(message.content);
    if (message.channel.id == '854565249898381313' && message.content === 'Jota C') {
        message.channel.send('Quue pedo prros! 🚀');
    }
})

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	} 
});