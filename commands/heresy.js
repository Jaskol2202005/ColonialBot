module.exports = {
  name: 'heresy',
  description: `sends heresy gif`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "https://tenor.com/view/cease-your-heresy-warhammer-40k-gif-19005947"
        }
      }
    })
  }
}
