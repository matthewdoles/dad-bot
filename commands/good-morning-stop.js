module.exports = {
  name: 'goodmorningstop',
  description: 'Stop daily good morning message.',
  execute(message) {
    message.stop();
  },
};
