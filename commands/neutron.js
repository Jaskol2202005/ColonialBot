module.exports = {
  name: 'neutron',
  description: 'gives tutorials on how to use the neutron highway',
  usage: '',
  execute(interaction, args, client) {
    if (args[0].name === `tutorial`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `https://i.imgur.com/gg6n5VM.jpg`
          }
        }
      })
    } else if (args[0].name === `website`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Plot neutron highway routes online here: https://www.spansh.co.uk/plotter`
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Desktop client for neutron routing here: https://github.com/winneon/neutron`
          }
        }
      })
    }
  }
}
