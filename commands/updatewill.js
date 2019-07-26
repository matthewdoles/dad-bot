module.exports = {
    name: 'updatewill',
    description: 'You better be careful, Grandpa can add or remove you from the will at his own whim',
    async execute(message, args) {      

        if (message.author.id === '209857245939367936') {
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

            const willName = args.shift();
            console.log(willName);
            const willAction = args.shift();
            console.log(willAction);
            const willDescription = args.join(' ');
            console.log(willDescription);

            // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
            if (willAction == 'add') {
                const affectedRows = await Will.update({ description: willDescription, inWill: true }, { where: { discordName: willName } });
                if (affectedRows > 0) {
                    return message.channel.send(`${willName} was added back to the will. Reason: '${willDescription}'.`);
                }
                return message.channel.send(`Couldn't find ${willName} in the will. Use !addtowill if they have never been added to the will before.`);
            }
            else if (willAction == 'remove') {
                if (willName.includes('196069711853649921')) return message.reply(`lol get 360 no-scoped loser. You can't remove ${willName} from the will.`);
                const affectedRows = await Will.update({ description: willDescription, inWill: false }, { where: { discordName: willName } });
                if (affectedRows > 0) {
                    return message.channel.send(`${willName} was removed from the will. Reason: '${willDescription}.'`);
                }
                return message.channel.send(`Couldn't find ${willName} in the will. Use !addtowill if they have never been added to the will before.`);
            }
            else {
                return message.channel.send(`Command parameters: Name, 'add' or 'remove', anything after is saved as the reason.`);
            }
        }
        else {
            return message.reply(`only Grandpa can add or remove people from his will.`);
        }
    },
};