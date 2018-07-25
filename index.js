
// require node's file system
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// retrieve command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
    // key is command name and the value the exported module
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    client.on('ready', () => {
        client.user.setActivity('https://git.io/twitter-photos-discord-bot', {type: 'WATCHING'});
    });
});

client.on('message', async message => {
    
    try {
        // if bot mentioned, ask politely what they want
        if (message.isMentioned(client.user)) {
            return message.channel.send("Yes, son?");
        } 
    } catch (err) {
        console.log(err);
    }

    // on message send, check that message begins with command prefix
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;
    
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
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.token);