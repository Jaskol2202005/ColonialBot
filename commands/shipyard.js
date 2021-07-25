module.exports = {
  name: 'shipyard',
  description: `links to coriolis and edsy as well as inara`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Build ships virtually and test their stats at [Coriolis](https://coriolis.io) and [EDSY](https://edsy.org)\n\nBrowse all ships on [inara](https://inara.cz/galaxy-shipyard/)"
        }
      }
    })
  }
}
