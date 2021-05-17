module.exports = {
  name: 'roadtoriches',
  description: `links to road to riches`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Need some starting money? Try road to riches! https://spansh.co.uk/riches"
        }
      }
    })
  }
}
