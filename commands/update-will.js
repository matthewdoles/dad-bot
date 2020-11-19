module.exports = {
  name: 'updatewill',
  description:
    'You better be careful, Grandpa can add or remove you from the will at his own whim',
  async execute(message, args) {
    if (message.author.id === '209857245939367936') {
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

        const willName = args.shift();
        console.log(willName);
        const willAction = args.shift();
        console.log(willAction);
        const willDescription = args.join(' ');
        console.log(willDescription);

        // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
        if (willAction == 'add') {
          const affectedRows = await Will.update(
            { description: willDescription, inWill: true },
            { where: { discordName: willName } }
          );
          if (affectedRows > 0) {
            return message.channel.send(
              `${willName} was added back to the will. Reason: '${willDescription}'.`
            );
          }
          return message.channel.send(
            `Couldn't find ${willName} in the will. Use !addtowill if they have never been added to the will before.`
          );
        } else if (willAction == 'remove') {
          if (willName.includes('196069711853649921'))
            return message.reply(
              `lol get 360 no-scoped loser. You can't remove ${willName} from the will.`
            );
          const affectedRows = await Will.update(
            { description: willDescription, inWill: false },
            { where: { discordName: willName } }
          );
          if (affectedRows > 0) {
            return message.channel.send(
              `${willName} was removed from the will. Reason: '${willDescription}.'`
            );
          }
          return message.channel.send(
            `Couldn't find ${willName} in the will. Use !addtowill if they have never been added to the will before.`
          );
        } else {
          return message.channel.send(
            `Command parameters: Name, 'add' or 'remove', anything after is saved as the reason.`
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return message.reply(
        `only Grandpa can add or remove people from his will.`
      );
    }
  },
};
