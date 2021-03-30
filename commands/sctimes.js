module.exports = {
  name: 'sctimes',
  description: `links to a sc travel time reference sheet`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Aproximate travel times for supercruise at: https://confluence.fuelrats.com/display/public/FRKB/Supercruise+Travel+Times"
        }
      }
    })
  }
}
