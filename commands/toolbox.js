module.exports = {
  name: 'toolbox',
  description: `links to cmdrs toolbox`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "[Cmdr's Toolbox](https://cmdrs-toolbox.com/), a useful material finder, fleet carrier calculator, and more"
        }
      }
    })
  }
}
