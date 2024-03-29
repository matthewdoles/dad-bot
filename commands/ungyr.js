const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ungyr')
    .setDescription('Are you sure about this?')
    .addStringOption((option) =>
      option
        .setName('search')
        .setDescription('Keywords to search by.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const reply = [
      'Oh no...',
      "This can't be right.",
      'I hope this is what you wanted.',
      'I always find something... anything...',
      'Why did you want me to look this up?',
      "I'm sorry...",
      'Is this one okay?',
      "I'm lost for words on this one.",
      'Does this make us friends?',
      'Please let this work...',
      'Um...',
      'Eh...',
      "I didn't ask to be made.",
      "I can't do anything right...",
      '😦',
    ];
    const replyListLength = reply.length;
    const randomReply = Math.floor(Math.random() * Math.floor(replyListLength));

    const image = [
      'https://i.imgur.com/cJ3C80P.jpg',
      'https://i.imgur.com/ROdpuaQ.jpg',
      'https://i.imgur.com/Xp0gAeA.jpg',
      'https://i.imgur.com/lb5Bo72.jpg',
      'https://i.imgur.com/rJqfkhr.jpg',
      'https://i.imgur.com/MYBvl9g.jpg',
      'https://i.imgur.com/ddUPWcI.jpg',
      'https://i.imgur.com/lSTPidc.jpg',
      'https://i.imgur.com/AukOHnc.jpg',
      'https://i.imgur.com/tPmymMi.jpg',
      'https://i.imgur.com/fAQGLJR.jpg',
      'https://i.imgur.com/sOXh3I0.jpg',
      'https://i.imgur.com/dKKiyvS.jpg',
      'https://i.imgur.com/8QsnOXk.jpg',
      'https://i.imgur.com/RTibBhx.jpg',
      'https://i.imgur.com/BwKi0lm.jpg',
      'https://i.imgur.com/TYCUI20.jpg',
      'https://i.imgur.com/bQ0YztX.jpg',
      'https://i.imgur.com/L5CkuiM.jpg',
      'https://i.imgur.com/M74rmso.jpg',
      'https://i.imgur.com/NMdsIJO.jpg',
      'https://i.imgur.com/vu3BdBr.jpg',
      'https://i.imgur.com/Fw9yZNe.jpg',
      'https://i.imgur.com/W338jbN.jpg',
      'https://i.imgur.com/LEdKgdN.jpg',
      'https://i.imgur.com/0HGhmR8.jpg',
      'https://i.imgur.com/l1HIsYT.jpg',
      'https://i.imgur.com/HyRrrDv.jpg',
      'https://i.imgur.com/1j3KqEs.jpg',
      'https://i.imgur.com/Ic2stKj.jpg',
      'https://i.imgur.com/XpmRzSM.jpg',
      'https://i.imgur.com/hiGJvPq.jpg',
      'https://i.imgur.com/DRAdxPF.jpg',
      'https://i.imgur.com/6W86CDY.jpg',
      'https://i.imgur.com/DQ40vur.jpg',
      'https://i.imgur.com/hvpXpDk.jpg',
      'https://i.imgur.com/MJjJUv8.jpg',
      'https://i.imgur.com/6vaH91A.jpg',
      'https://i.imgur.com/NLTnAfk.jpg',
      'https://i.imgur.com/eKY5o9K.jpg',
      'https://i.imgur.com/fQUALhz.jpg',
      'https://i.imgur.com/3DS3bJw.jpg',
      'https://i.imgur.com/JinhClo.jpg',
      'https://i.imgur.com/MOUuFpL.jpg',
      'https://i.imgur.com/w1c60GS.jpg',
      'https://i.imgur.com/HqKZtaQ.jpg',
      'https://i.imgur.com/T9fHxeT.jpg',
      'https://i.imgur.com/ZmJWt9A.jpg',
      'https://i.imgur.com/x4C6MrR.jpg',
      'https://i.imgur.com/kbQfQqF.jpg',
      'https://i.imgur.com/YzIsYVp.jpg',
      'https://i.imgur.com/DcPtEon.jpg',
      'https://i.imgur.com/AHgGibz.jpg',
      'https://i.imgur.com/dhtYtC3.jpg',
      'https://i.imgur.com/gBCJoDa.jpg',
      'https://i.imgur.com/5mK78gs.jpg',
      'https://i.imgur.com/lTh2BJY.jpg',
      'https://i.imgur.com/YaNobK3.jpg',
      'https://i.imgur.com/HGAoUNk.jpg',
      'https://i.imgur.com/B50cikP.jpg',
      'https://i.imgur.com/GPdUscv.jpg',
      'https://i.imgur.com/nso01PU.jpg',
      'https://i.imgur.com/VbZ7tNF.jpg',
      'https://i.imgur.com/ar1fUiN.jpg',
      'https://i.imgur.com/julG6ux.jpg',
      'https://i.imgur.com/s2ZtWcv.jpg',
      'https://i.imgur.com/DTy0z0V.jpg',
      'https://i.imgur.com/nUn7d8f.jpg',
      'https://i.imgur.com/FTb2iNe.jpg',
      'https://i.imgur.com/pwfKcTd.jpg',
      'https://i.imgur.com/cWHIpxS.jpg',
      'https://i.imgur.com/5GP3nVc.png',
      'https://i.imgur.com/wp5DPTu.jpg',
      'https://i.imgur.com/rYvsoIp.jpg',
      'https://i.imgur.com/xxHdmSU.jpg',
      'https://i.imgur.com/4gJExTX.jpg',
      'https://i.imgur.com/gqgT1y8.jpg',
      'https://i.imgur.com/MhjOhca.jpg',
      'https://i.imgur.com/yPnYj6P.jpg',
      'https://i.imgur.com/wzw16PW.jpg',
      'https://i.imgur.com/bQZ85dq.jpg',
    ];
    const imageListLength = image.length;
    const randomImage = Math.floor(Math.random() * Math.floor(imageListLength));

    return interaction.reply(reply[randomReply] + ' ' + image[randomImage]);
  },
};
