const snekfetch = require('snekfetch');

module.exports = {
    name: 'dog',
    description: 'A random dog wow.',
    async execute(message) {
      snekfetch.get('https://dog.ceo/api/breeds/image/random')
        .then(({ body }) => {
          message.channel.send(body.message)
            .catch(console.log);
        })
        .catch(console.log);
    },
};