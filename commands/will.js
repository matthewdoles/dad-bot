module.exports = {
    name: 'will',
    description: 'Who has made the cut and who needs to suck up a bit more',
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
        const Will = sequelize.define('will', {
            discordName: {
                type: Sequelize.TEXT,
                primaryKey: true
            },
            description: Sequelize.TEXT,
            inWill: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        });
        Will.sync();

        let willMessage ='';
        const willList = await Will.findAll({ where: { inWill: true} });
        if (willList.length > 0) willMessage += 'In the Will: \n';
        for (const will of willList) {
            willMessage += `${will.discordName}: ${will.description} \n`;
        }
        const notInWillList = await Will.findAll({ where: { inWill: false} });
        if (notInWillList.length > 0) willMessage += '\nNot in the Will: \n';
        for (const will of notInWillList) {
            willMessage += `${will.discordName}: ${will.description} \n`;
        }
        return message.channel.send(willMessage);
    },
};