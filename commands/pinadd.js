module.exports = {
    name: 'addpin',
    description: 'Pin a meme, tweet, memory, etc.',
    async execute(message, args) {      
        var sequelize = require('sequelize-heroku').connect(require('sequelize'));
        const Sequelize = require('sequelize');

        if (sequelize) {
            sequelize.authenticate().then( function() {
                var config = sequelize.connectionManager.config;
                console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
            }).catch( function(err) {
                var config = sequelize.connectionManager.config;
                console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
            });
        } else {
            console.log('No environnement variable found.');
        }
        const Pin = sequelize.define('pin', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pinName: Sequelize.TEXT,
        });
        Pin.sync();

        const messageId = args.shift();

        message.channel.fetchMessage(messageId).then(msg => {
            try {
                // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                const pin = Pin.create({pinName: msg.content});
                return message.channel.send(`Pin successfully saved.`);
            }
            catch (e) {
                return message.channel.send(`Oopsie woopsies, something went wrong when saving the pin.`);
            }
        })

    },
};