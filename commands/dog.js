const snekfetch = require('snekfetch');

module.exports = {
    name: 'dog',
    description: 'A random dog wow.',
    aliases: ['doggo', 'doggy', 'goodboy', 'woofer', 'boofer'],
    async execute(message, args) {
      const breed = args[0];
      if (breed === 'list') {
        message.channel.send('List of breeds can be found here: https://dog.ceo/dog-api/breeds-list')
          .catch(console.log);
        return;
      }
      if (breed) {
        snekfetch.get(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(({ body }) => {
          message.channel.send(body.message)
            .catch(console.log);
        })
        .catch(err => {
          message.channel.send('UwU sowwy but no images were found for that breed UwU.')
            .catch(console.log);
        });
      } else {
        snekfetch.get(`https://dog.ceo/api/breeds/image/random`)
          .then(({ body }) => {
            message.channel.send(body.message)
              .catch(console.log);
          })
      }
    },
};