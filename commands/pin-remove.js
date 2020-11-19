const Sequelize = require('sequelize');

module.exports = {
  name: 'removepin',
  description: 'Remove a pin',
  async execute(message, args) {
    if (message.author.id === '196069711853649921') {
      try {
        const sequelize = new Sequelize(
          process.env.database_name,
          process.env.database_user,
          process.env.database_password,
          {
            host: process.env.database_host,
            dialect: 'postgres',
            logging: false,
          }
        );

        const Pin = sequelize.define('pin', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          pinName: Sequelize.TEXT,
        });
        Pin.sync();

        const pinId = args;
        // equivalent to: DELETE from tags WHERE name = ?;
        const rowCount = await Pin.destroy({ where: { id: pinId } });
        if (!rowCount) return message.reply('Having trouble removing pin.');
        return message.reply('Pin successfully deleted.');
      } catch (error) {
        console.log(error);
      }
    } else {
      return message.channel.send('Admin functionality.');
    }
  },
};
