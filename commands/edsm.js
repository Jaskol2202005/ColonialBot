module.exports = {
  name: 'edsm',
  description: 'links to edsm homepage',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find accurate exploration data at: https://edsm.net`);
  }
}