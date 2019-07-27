module.exports = {
    name: 'pinid',
    description: 'Look for a pin\'s unique id.',
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

        const pinContent = args.join(' ');
        const findPin = await Pin.findAll({ where: { pinName: { [Op.iLike]: '%' + pinContent + '%' }}});
        if (findPin.length > 0) {
            return message.channel.send(findPin[0].id + ': ' + findPin[0].pinName);
        }
        else {
            return message.channel.send('Sorry, not finding any pins using those search terms');
        }
    },
};