module.exports = {
  name: 'inara',
  description: `links to the inara homepage`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Use [inara](https://inara.cz) for finding virtually anything in-game"
        }
      }
    })
  }
}
