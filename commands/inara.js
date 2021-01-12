module.exports = {
  name: 'inara',
  description: 'links to inara homepage',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find mostly anything related to trading, combat and player stats at: https://inara.cz`);
  }
}
