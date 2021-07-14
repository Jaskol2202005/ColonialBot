module.exports = { //again... read the description
  name: 'roll',
  description: `rolls a dice of your choice`,
  usage: ``,
  execute(interaction, args, client) {
    if (args[0].name === `d4`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: getRandomInt(4) + 1
          }
        }
      })
    } else if (args[0].name === `d6`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: getRandomInt(6) + 1
          }
        }
      })
    } else if (args[0].name === `d8`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: getRandomInt(8) + 1
          }
        }
      })
    } else if (args[0].name === `d10`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: getRandomInt(10) + 1
          }
        }
      })
    } else if (args[0].name === `d12`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: getRandomInt(12) + 1
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: getRandomInt(20) + 1
          }
        }
      })
    }
  }
}
