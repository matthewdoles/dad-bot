const Sequelize = require('sequelize');

module.exports = {
  name: 'addpin',
  description: 'Pin a meme, tweet, memory, etc.',
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

      const messageId = args.shift();

      message.channel.fetchMessage(messageId).then((msg) => {
        try {
          // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
          const pin = Pin.create({ pinName: msg.content });
          return message.channel.send(`Pin successfully saved.`);
        } catch (e) {
          return message.channel.send(
            `Oopsie woopsies, something went wrong when saving the pin.`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
