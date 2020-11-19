module.exports = {
  name: 'poll',
  description: 'Gather the opinion of your peers',
  execute(message, args) {
    // a message was entered other than the command - react
    if (args.length > 1) {
      message.react('✅');
      message.react('❌');
    }
    // if no arguments (no question) ask them to provide one
    else {
      return message.reply('What question are you trying to poll?');
    }
  },
};
