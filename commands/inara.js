module.exports = {
  name: 'inara',
  description: 'links to inara homepage',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`https://inara.cz`);
  }
}
