module.exports = {
  name: 'fuel',
  description: 'links to fuelrat website',
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "[Need Fuel?](https://fuelrats.com/i-need-fuel)"
        }
      }
    })
  }
}
