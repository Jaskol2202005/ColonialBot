module.exports = {
  name: 'caniscthere',
  description: `pretty much a meme, tells people that they can't supercruise to another system`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "http://caniflytothenextstarinelitedangero.us"
        }
      }
    })
  }
}
