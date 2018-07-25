const snekfetch = require('snekfetch');
module.exports = {
    name: 'cat',
    description: 'A random cat wow.',
    async execute(message) {
        try {
            const { body } = await snekfetch.get('https://aws.random.cat/meow');

            message.channel.send(body.file);
        } catch (err) {
            console.log(err);
        }
        
    },
};