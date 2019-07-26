module.exports = {
    name: 'addtowill',
    description: 'Congratulations! Grandpa can stand you enough to leave you something in his last dying wishes.',
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
            const willDescription = args.join(' ');
            console.log(willDescription);
            try {
                // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                const will = await Will.create({
                    discordName: willName,
                    description: willDescription,
                    inWill: true
                });
                return message.channel.send(`${will.discordName} was added to the will.`);
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return message.channel.send(`${willName} is already in the will.`);
                }
                return message.channel.send(`Something went wrong when adding ${willName} to the will. Oopsie woopsies.`);
            
            }
        }
        else {
            return message.reply(`only Grandpa can add people to his will.`);
        }
    },
};