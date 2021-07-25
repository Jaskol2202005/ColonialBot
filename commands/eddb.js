module.exports = {
  name: 'eddb',
  description: `links to the eddb homepage`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Use [EDDB](https://eddb.io) for accurate and easily accesible ttrading data"
        }
      }
    })
  }
}
