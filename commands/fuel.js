module.exports = {
  name: 'fuel',
  description: 'links to fuelrat website',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Get fuel at: https://fuelrats.com/i-need-fuel`);
  }
}
