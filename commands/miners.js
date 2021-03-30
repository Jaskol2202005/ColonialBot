module.exports = {
  name: 'miners',
  description: `links to edtools.cc/miners`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Find hotspots and sell locations for mining at: https://edtools.cc/miner"
        }
      }
    })
  }
}
