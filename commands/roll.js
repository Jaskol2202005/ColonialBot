module.exports = { //again... read the description
  name: 'roll',
  description: `rolls a dice of your choice`,
  usage: ``,
  execute(interaction, args, client) {
    function between(min, max) {
      return Math.floor(
        Math.random() * (max - min + 1) + min
      )
    }
    if (args[0].name === `d4`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: between(1, 4)
          }
        }
      })
    } else if (args[0].name === `d6`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: between(1, 6)
          }
        }
      })
    } else if (args[0].name === `d8`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: between(1, 8)
          }
        }
      })
    } else if (args[0].name === `d10`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: between(1, 10)
          }
        }
      })
    } else if (args[0].name === `d12`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: between(1, 12)
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: between(1, 20)
          }
        }
      })
    }
  }
}
