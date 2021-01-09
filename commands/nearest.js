module.exports = {
  name: 'nearest',
  description: 'links to inara.cz/nearest',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find nearest stations with services, commodities, modules or ships at https://eddb.io/station`);
  }
}
