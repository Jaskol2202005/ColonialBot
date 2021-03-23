module.exports = {
  name: 'heresy',
  cooldown: 10,
  description: 'links to the "cease your heresy" gif',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`https://tenor.com/view/cease-your-heresy-warhammer-40k-gif-19005947`);
  }
}
