module.exports = {
    name: 'poll',
    description: 'Gather the opinion of your peers, even though they don\'t matter',
    execute(message, args) {   
        // a message was entered other than the command - react
        if (args.length > 1) { 
            message.react('✅');
            message.react('❌');
        } 
        // if no arguments (no question) given, politely ask them to provide one
        else {
            return message.reply('what question are you trying to poll numbnuts?');
        }
    },
};