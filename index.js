const fs = require('fs');
const Discord = require('discord.js');
const goodMorningMessage = require('./commands/good-morning');
const client = new Discord.Client();
client.commands = new Discord.Collection();
require('dotenv').config();

// retrieve command files
const commandFiles = fs.readdirSync('./commands');

// key is command name, value the exported module
commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

// set status, provide help command
client.on('ready', () => {
  client.user.setActivity('!dadhelp');
});

client.on('message', async (message) => {
  // bot tagged response
  if (message.isMentioned(client.user)) {
    return message.channel.send('How can I help you son?');
  }

  // daniel craig
  if (message.content.toLowerCase() === 'daniel craig') {
    return message.channel.send(
      'holy poggers guys https://imgur.com/a/jXOA1Aw'
    );
  }

  // return if message doesn't begin with command prefix or is a message from the bot
  if (!message.content.startsWith(process.env.prefix) || message.author.bot) {
    return;
  }

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
      message.author + " you didn't provide any parameters silly!"
    );
  }

  try {
    if (
      commandName === 'goodmorningstart' ||
      commandName === 'goodmorningstop'
    ) {
      command.execute(goodMorningMessage);
    }
    command.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.token);
