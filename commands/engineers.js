module.exports = {
  name: 'engineers',
  description: `links to inara page about engineers`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Find where and what each engineer does at: https://inara.cz/galaxy-engineers/"
        }
      }
    })
  }
}
