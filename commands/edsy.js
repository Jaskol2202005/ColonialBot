module.exports = {
  name: 'edsy',
  description: 'links to edsy homepage',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`https://edsy.org`);
  }
}
