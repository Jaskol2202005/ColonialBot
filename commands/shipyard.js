module.exports = {
  name: 'shipyard',
  description: `links to coriolis and edsy as well as inara`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Build ships online and test their stats at:\nhttps://coriolis.io\nhttps://edsy.org\n\nBrowse all ships at: https://inara.cz/galaxy-shipyard/"
        }
      }
    })
  }
}
