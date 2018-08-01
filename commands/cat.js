const snekfetch = require('snekfetch');

module.exports = {
    name: 'cat',
    description: 'A random cat wow.',
    aliases: ['kitten', 'meow'],
    async execute(message) {
      snekfetch.get('https://aws.random.cat/meow')
        .then(({ body }) => {
          message.channel.send(body.file)
            .catch(console.log);
        })
        .catch(console.log);
    },
};