module.exports = {
  name: 'eddb',
  description: 'links to eddb homepage',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find accurate trading data at: https://eddb.io`);
  }
}
