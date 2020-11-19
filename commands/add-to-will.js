module.exports = {
  name: 'addtowill',
  description:
    'Congratulations! Grandpa can stand you enough to leave you something in his last dying wishes.',
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
        const willDescription = args.join(' ');
        console.log(willDescription);
        try {
          const will = await Will.create({
            discordName: willName,
            description: willDescription,
            inWill: true,
          });

          return message.channel.send(
            `${will.discordName} was added to the will.`
          );
        } catch (e) {
          if (e.name === 'SequelizeUniqueConstraintError') {
            return message.channel.send(`${willName} is already in the will.`);
          }

          return message.channel.send(
            `Something went wrong when adding ${willName} to the will. Oopsie woopsies.`
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return message.reply(`only Grandpa can add people to his will.`);
    }
  },
};
