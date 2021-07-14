module.exports = { //again... read the description
  name: 'flip',
  description: `flips a coin`,
  usage: ``,
  execute(interaction, args, client) {
    function between(min, max) {
      return Math.floor(
        Math.random() * (max - min + 1) + min
      )
    }
    if (between(1, 2) === 1) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Heads`
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Tails`
          }
        }
      })
    }
  }
}
