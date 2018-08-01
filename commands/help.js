module.exports = {
    name: 'dadhelp',
    description: 'List all available commands or info about a specific command.',
    aliases: ['helpmedaddy'],
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

		// display all available commands when no argument entered
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nUse \`${process.env.prefix}dadhelp [command name]\` to get info on a specific command!`);

			return message.channel.send(data, { split: true })
		}
		
		// display aliases and description when command specified
        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);

		message.channel.send(data, { split: true });
    },
};