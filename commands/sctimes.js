module.exports = {
  name: 'sctimes',
  description: 'links to a sc travel time reference sheet',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Aproximate travel times for supercruise at: https://confluence.fuelrats.com/display/public/FRKB/Supercruise+Travel+Times`);
  }
}
