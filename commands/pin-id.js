const Sequelize = require('sequelize');

module.exports = {
  name: 'pinid',
  description: "Look for a pin's unique id.",
  async execute(message, args) {
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

      const pinContent = args.join(' ');
      const findPin = await Pin.findAll({
        where: { pinName: { [Op.iLike]: '%' + pinContent + '%' } },
      });
      if (findPin.length > 0) {
        return message.channel.send(findPin[0].id + ': ' + findPin[0].pinName);
      } else {
        return message.channel.send(
          'Sorry, not finding any pins using those search terms'
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
