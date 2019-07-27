module.exports = {
    name: 'randompin',
    description: 'Find a random pin XD',
    async execute(message, args) {      
        var sequelize = require('sequelize-heroku').connect(require('sequelize'));
        const Sequelize = require('sequelize');
        const Op = Sequelize.Op

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

        const findPin = await Pin.findAll();
        if (findPin.length > 0) {
            const findPinLength = findPin.length;
            const randomPin = Math.floor(Math.random() * Math.floor(findPinLength));
            return message.channel.send(findPin[randomPin].pinName);
        }
        else {
            return message.channel.send('Sorry, there are no saved pins');
        }
    },
};