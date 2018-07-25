var Twitter = require('twitter');
module.exports = {
    name: 'tweet',
    description: 'Retrieve full photo album for a tweet.',
    async execute(message, args) {
        try {
            // Twitter API keys
            var client = new Twitter({
                consumer_key: process.env.twitter_consumer_key,
                consumer_secret: process.env.twitter_consumer_secret,
                access_token_key: process.env.twitter_access_token_key,
                access_token_secret: process.env.twitter_access_token_secret
            });

            // split tweet URL by slash
            args = args[0].split('/');
            
            // retrieve tweet information, tweet's unique id is last variable in args array
            client.get('statuses/show', { id: args[args.length - 1], tweet_mode:'extended'}, function(error, tweets, response) 
            {
                if (!error) 
                {   
                    // check if any media objects present
                    if (tweets.extended_entities.media.length == 0)
                    {
                        message.channel.send("There are no photos in this tweet silly!");
                    }
                    else 
                    {
                        // loop through and print media objects
                        for (var i = 0; i < tweets.extended_entities.media.length; i++) 
                        {
                            message.channel.send(tweets.extended_entities.media[i].media_url);
                        }
                    }
                    
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
};
