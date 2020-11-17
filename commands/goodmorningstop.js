module.exports = {
  name: 'goodmorningstop',
  description: 'Start daily good morning message.',
  execute(message) {
    message.stop();
  },
};
