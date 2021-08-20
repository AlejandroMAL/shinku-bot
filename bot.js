require('dotenv').config();
const { Client, Intents } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
  intents: [Intents.NON_PRIVILEGED, 'GUILD_MEMBERS', 'GUILD_PRESENCES'],
});

const prefix = '!';
const reminder = `Este mensaje es solo para recordarte que el scrim programado para hoy comenzara dentro de 1 hora`;

client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.content.startsWith(prefix + 'schedule')) {
    const scrimHour = message.content.split(`${prefix}schedule`)[1].trim();

    if (!scrimHour) {
      message.channel.send('Especifica la hora a programar el scrim.');
      return;
    }

    const plainHour = scrimHour.slice(0, 5).split(':');
    const hours = Number(plainHour[0]);
    const minutes = Number(plainHour[1]);

    const role = message.guild.roles.cache.find(
      (r) => r.name === 'Dragonslayer'
    );

    const guildMembers = message.guild.members.cache
      .filter((member) => member.roles.cache.find((r) => r === role))
      .map((member) => member.user);

    message.channel.send(`Scrim Dia ##, ${scrimHour} pm, hora MX, Server`);

    const notifyGuildMembers = () => {
      guildMembers.forEach((member) =>
        client.users.cache.get(member.id).send(reminder)
      );
    };

    notifyGuildMembers();

    cron.schedule(`0 ${hours - 1} * * *`, () => {
      notifyGuildMembers();
    });
  }
});
