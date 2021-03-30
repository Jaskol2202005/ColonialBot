module.exports = {
  name: 'pins',
  description: `links to pins gif`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "https://cdn.discordapp.com/emojis/682556509846110256.gif"
        }
      }
    })
  }
}
