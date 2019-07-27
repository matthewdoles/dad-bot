module.exports = {
    name: 'removepin',
    description: 'Remove a pin',
    async execute(message, args) {    
        if (message.author.id === '196069711853649921') {  
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

            const pinId = args;
            // equivalent to: DELETE from tags WHERE name = ?;
            const rowCount = await Pin.destroy({ where: { id: pinId } });
            if (!rowCount) return message.reply('Having trouble removing pin.');
            return message.reply('Pin successfully deleted.');
        }
        else {
            return message.channel.send('Admin functionality.');
        }
    },
};