module.exports = {
  name: 'engineers',
  description: 'links to inara page about engineers',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find where and what each engineer does at: https://inara.cz/galaxy-engineers/`);
  }
}
