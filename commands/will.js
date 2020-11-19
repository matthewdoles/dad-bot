module.exports = {
  name: 'will',
  description: 'Who has made the cut and who needs to suck up a bit more',
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

      const Will = sequelize.define('will', {
        discordName: {
          type: Sequelize.TEXT,
          primaryKey: true,
        },
        description: Sequelize.TEXT,
        inWill: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      });
      Will.sync();

      let willMessage = '';
      const willList = await Will.findAll({ where: { inWill: true } });
      if (willList.length > 0) willMessage += 'In the Will: \n';
      for (const will of willList) {
        willMessage += `${will.discordName}: ${will.description} \n`;
      }
      const notInWillList = await Will.findAll({ where: { inWill: false } });
      if (notInWillList.length > 0) willMessage += '\nNot in the Will: \n';
      for (const will of notInWillList) {
        willMessage += `${will.discordName}: ${will.description} \n`;
      }
      return message.channel.send(willMessage);
    } catch (error) {
      console.log(error);
    }
  },
};
