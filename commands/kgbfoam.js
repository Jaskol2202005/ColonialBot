module.exports = {
  name: 'kgbfoam',
  description: 'links to kgbfoam fuelrats confluence',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Learn to filter the galaxy map for scoopable stars at: https://confluence.fuelrats.com/pages/releaseview.action?pageId=1507609\n\nOther languages available at: https://confluence.fuelrats.com/display/public/FRKB/KGBFOAM`);
  }
}
