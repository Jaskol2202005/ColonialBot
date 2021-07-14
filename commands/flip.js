module.exports = { //again... read the description
  name: 'flip',
  description: `flips a coin`,
  usage: ``,
  execute(interaction, args, client) {
    if (getRandomInt(2) === 1) {
      let reply = `Heads`
    } else {
      let reply = `Tails`
    }
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: reply
        }
      }
    })
  }
}
