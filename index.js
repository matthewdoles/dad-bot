
// require node's file system
const fs = require('fs');
// Discord.js
const Discord = require('discord.js');
// environment variables
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

// retrieve command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // key is command name; value the exported module
    client.commands.set(command.name, command);
}

// set status, provide help command
client.on('ready', () => {
    client.user.setActivity(' out for my dads: !dadhelp', {type: 'Watching'});
});

client.on('message', async message => {
    
    if (message.isMentioned(client.user)) {
        return message.channel.send("How can I help you son?");
    } 
    yourMomArray = ['ur mom', 'ur mom gay', 'ur gay', 'your mom', 'your mom gay', 'your gay'];
    if (yourMomArray.some(substring=>message.content.toLowerCase().includes(substring))) {
        return message.channel.send("No u!");
    }

    // return if message doesn't begin with command prefix or is a message from the bot
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    
    // split command arguments by spaces
    const args = message.content.slice(process.env.prefix.length).split(/ +/);
    
    // returns command name; removes it from array, leaving just parameters
    const commandName = args.shift().toLowerCase();

    // save command object & check for command aliases
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // if not a valid command, return
    if (!command) return;

    // guild only and text channel check
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Cannot execute this command.');
    }

    // check if any args required and entered
    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author} silly!`);
    }
    
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(process.env.TOKEN);