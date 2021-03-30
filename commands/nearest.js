module.exports = {
  name: 'nearest',
  description: `links to inara.cz/nearest`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Find nearest stations with services, commodities, modules or ships at https://inara.cz/nearest/"
        }
      }
    })
  }
}
