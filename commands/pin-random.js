const Sequelize = require('sequelize');

module.exports = {
  name: 'randompin',
  description: 'Find a random pin XD',
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

      const findPin = await Pin.findAll();
      if (findPin.length > 0) {
        const findPinLength = findPin.length;
        const randomPin = Math.floor(Math.random() * Math.floor(findPinLength));
        return message.channel.send(findPin[randomPin].pinName);
      } else {
        return message.channel.send('Sorry, there are no saved pins');
      }
    } catch (error) {
      console.log(error);
    }
  },
};
