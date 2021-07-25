module.exports = {
  name: 'engineers',
  description: `links to inara page about engineers`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "[Here's a chart of engineers to help with unlocks and planning](https://inara.cz/galaxy-engineers/)"
        }
      }
    })
  }
}
