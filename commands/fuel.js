module.exports = {
  name: 'fuel',
  description: 'links to fuelrat website',
  execute(interaction, args) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Get fuel at: https://fuelrats.com/i-need-fuel"
        }
      }
    })
  }
}
