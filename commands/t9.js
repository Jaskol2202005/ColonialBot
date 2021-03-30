module.exports = {
  name: 't9',
  description: `links to a video of a t9, really, that's it`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "https://www.youtube.com/watch?v=uIBPtuwpQQ4"
        }
      }
    })
  }
}
