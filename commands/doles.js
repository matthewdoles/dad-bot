var Twitter = require('twitter');
const Discord = require('discord.js');
module.exports = {
    name: 'doles',
    description: 'My twitter timeline',
    async execute(message) {
        try {
            var client = new Twitter({
                consumer_key: process.env.twitter_consumer_key,
                consumer_secret: process.env.twitter_consumer_secret,
                access_token_key: process.env.twitter_access_token_key,
                access_token_secret: process.env.twitter_access_token_secret
                });
            
                client.get('statuses/user_timeline', { screen_name: 'mdoles27', count: 5, include_rts: true, exclude_replies: false, tweet_mode:'extended'}, function(error, tweets, response) 
                {
                if (!error) 
                {
                    
                    for (var i = 0; i < tweets.length; i++)
                    {

                        const embed = new Discord.RichEmbed()
                            .setColor('#00aced')
                            .setTitle(tweets[i].user.name)
                            .setDescription(tweets[i].full_text);

                        message.channel.send(embed);
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
};
