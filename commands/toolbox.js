module.exports = {
  name: 'toolbox',
  description: `links to cmdrs toolbox`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Useful material finding, fleet carrier calculators, and more at: https://cmdrs-toolbox.com/"
        }
      }
    })
  }
}
