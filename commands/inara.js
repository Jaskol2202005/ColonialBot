module.exports = {
  name: 'inara',
  description: `links to the inara homepage`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Find mostly anything related to trading, combat and player stats at: https://inara.cz"
        }
      }
    })
  }
}
