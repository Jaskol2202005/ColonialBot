module.exports = {
  name: 'edsm',
  description: `links to the edsm homepage`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Find accurate exploration data at: https://edsm.net"
        }
      }
    })
  }
}
