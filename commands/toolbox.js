module.exports = {
  name: 'toolbox',
  description: 'links to cmdrs toolbox',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Useful material finding, fleet carrier calculators, and more at: https://cmdrs-toolbox.com/`);
  }
}
