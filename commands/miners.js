module.exports = {
  name: 'miners',
  description: 'links to edtools.cc/miners',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Find hotspots and sell locations for mining at: https://edtools.cc/miner`);
  }
}
