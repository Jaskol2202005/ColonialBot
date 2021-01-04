module.exports = {
  name: 'nearest',
  description: 'links to inara.cz/nearest',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find nearest stations and services at: https://inara.cz/galaxy-nearest/`);
  }
}
