const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription("It's someone's special day!")
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('Whose special day is it?')
        .setRequired(true)
    ),
  async execute(interaction) {
    return interaction.reply(
      'Happy Birthday <@' +
        interaction.options.getUser('user') +
        '> https://i.imgur.com/ZZUtkSL.png'
    );
  },
};
