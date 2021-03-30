module.exports = {
  name: 'flamer',
  description: `sends heavy flamer gif`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "https://tenor.com/view/heavy-flamer-heresy-purge-warhammer40k-lightning-claws-gif-16488791"
        }
      }
    })
  }
}
