const fs = require('fs');
const cron = require('cron');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
require('dotenv').config();

// retrieve command files
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // key is command name; value the exported module
  client.commands.set(command.name, command);
}

const scheduledMessage = new cron.CronJob('0 9 * * *', async () => {
  const channel = client.channels.get('135863390001299456');
  const today = new Date();
  const randomReply = Math.floor(Math.random() * 4);
  const reply = [
    'Good morning gamers! ',
    'gmg ',
    'Good morning gamers! Lets get this bread. ',
    'Rise young kings, time to get that bread gamers. ',
  ];

  if (today.getDay() === 3) {
    snekfetch
      .get(
        'https://api.imgur.com/3/gallery/search/time/month?q=it+is+wednesday+my+dudes'
      )
      .set({
        Authorization: `Client-ID ${process.env.imgur_client_id}`,
      })
      .then(({ body }) => {
        return channel.send(
          reply[randomReply] + 'It is Wednesday my dudes ' + body.data[0].link
        );
      })
      .catch(console.log);
  } else {
    snekfetch
      .get(
        'https://api.imgur.com/3/gallery/search/time/week?q=good+morning&perPage=5'
      )
      .set({ Authorization: `Client-ID ${process.env.imgur_client_id}` })
      .then(({ body }) => {
        return channel.send(
          reply[randomReply] + body.data[Math.floor(Math.random() * 50)].link
        );
      })
      .catch(console.log);
  }
});

// set status, provide help command
client.on('ready', () => {
  client.user.setActivity(' out for my dads: !dadhelp', { type: 'Watching' });
});

client.on('message', async (message) => {
  if (message.isMentioned(client.user)) {
    return message.channel.send('How can I help you son?');
  }

  if (message.content.toLowerCase() === 'daniel craig') {
    return message.channel.send(
      'holy poggers guys https://imgur.com/a/jXOA1Aw'
    );
  }

  // return if message doesn't begin with command prefix or is a message from the bot
  if (!message.content.startsWith(process.env.prefix) || message.author.bot)
    return;

  // split command arguments by spaces
  const args = message.content.slice(process.env.prefix.length).split(/ +/);

  // returns command name; removes it from array, leaving just parameters
  const commandName = args.shift().toLowerCase();

  // save command object & check for command aliases
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  // if not a valid command, return
  if (!command) return;

  // guild only and text channel check
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('Cannot execute this command.');
  }

  // check if any args required and entered
  if (command.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author} silly!`
    );
  }

  try {
    if (
      commandName === 'goodmorningstart' ||
      commandName === 'goodmorningstop'
    ) {
      command.execute(scheduledMessage);
    }
    command.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.token);
