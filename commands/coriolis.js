module.exports = {
  name: 'coriolis',
  description: 'links to coriolis homepage',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`https://coriolis.io`);
  }
}
