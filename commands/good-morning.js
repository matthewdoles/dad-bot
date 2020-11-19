const cron = require('cron');
const snekfetch = require('snekfetch');

const goodMorningMessage = new cron.CronJob(
  '0 9 * * *',
  async () => {
    const channel = client.channels.get('135863390001299456');
    const today = new Date();
    const randomReply = Math.floor(Math.random() * 4);
    const reply = [
      'Good morning gamers! ',
      'gmg. ',
      'Good morning gamers! Lets get this bread. ',
      'Rise young kings, time to get that bread gamers. ',
    ];

    if (today.getDay() === 3) {
      snekfetch
        .get(
          'https://api.imgur.com/3/gallery/search/time/month?q=it+is+wednesday+my+dudes'
        )
        .set({
          Authorization: `Client-ID ${process.env.imgur_client_id}`,
        })
        .then(({ body }) => {
          return channel.send(
            reply[randomReply] + 'It is Wednesday my dudes ' + body.data[0].link
          );
        })
        .catch(console.log);
    } else {
      snekfetch
        .get(
          'https://api.imgur.com/3/gallery/search/time/week?q=good+morning&perPage=5'
        )
        .set({ Authorization: `Client-ID ${process.env.imgur_client_id}` })
        .then(({ body }) => {
          return channel.send(
            reply[randomReply] + body.data[Math.floor(Math.random() * 25)].link
          );
        })
        .catch(console.log);
    }
  },
  null,
  false,
  'America/Indiana/Indianapolis'
);

module.exports = goodMorningMessage;
