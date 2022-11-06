const { SlashCommandBuilder } = require('discord.js');
const Twitter = require('twitter');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tweet')
    .setDescription('Post tweet album images.')
    .addStringOption((option) =>
      option.setName('url').setDescription('URL of tweet.').setRequired(true)
    ),
  async execute(interaction) {
    try {
      // Twitter API keys
      var client = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret,
      });

      // split tweet URL by slash
      const url = interaction.options.getString('url').split('/');

      // retrieve tweet information, tweet's unique id is last variable in args array
      client.get(
        'statuses/show',
        { id: url[url.length - 1], tweet_mode: 'extended' },
        async (error, tweets) => {
          let message = interaction.options.getString('url') + '\n';
          if (!error) {
            // check if any media objects present
            if (tweets.extended_entities.media.length == 0) {
              message = 'There are no photos in this tweet silly!';
            } else {
              // loop through and print media objects
              for (var i = 0; i < tweets.extended_entities.media.length; i++) {
                message += tweets.extended_entities.media[i].media_url + '\n';
              }
            }
          }
          await interaction.reply(message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
