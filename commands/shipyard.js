module.exports = {
  name: 'shipyard',
  description: 'links to coriolis and edsy',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Build ships online and test their stats at:\nhttps://coriolis.io\nhttps://edsy.org\n\nFind nearest ships and module at: \nhttps://eddb.io/station`);
  }
}
