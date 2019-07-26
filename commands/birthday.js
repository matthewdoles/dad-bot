module.exports = {
    name: 'birthday',
    description: 'It\'s someone\'s special day!',
    execute(message) {      

       // if no user specified, prompt no user give
        if (!message.mentions.users.size) {
            message.channel.send(`Sorry, no user given. Whose birthday is it?`);
        } else {
            // wish happy birthday to first user tagged
            const taggedUser = message.mentions.users.first();
            message.channel.send(`Happy Birthday ${taggedUser.username}!`, {files: ["https://i.imgur.com/ZZUtkSL.png"]});
        }

        
    },
};