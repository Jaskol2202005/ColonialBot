module.exports = {
  name: 'invite',
  description: `Sends Adama's invite link`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "https://discord.gg/trcg"
        }
      }
    })
  }
}
