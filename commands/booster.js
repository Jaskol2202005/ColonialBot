module.exports = {
  name: 'booster',
  description: 'links to exegious video on how to unlock the gfsd booster',
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Here's how to unlock the guardian fsd booster: https://youtu.be/J9C9a00-rkQ"
        }
      }
    })
  }
}
