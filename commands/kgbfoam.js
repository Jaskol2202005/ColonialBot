module.exports = {
  name: 'kgbfoam',
  description: `links to page on how to filter fuel stars`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Learn to filter the galaxy map for scoopable stars at: https://confluence.fuelrats.com/pages/releaseview.action?pageId=1507609\n\nOther languages available at: https://confluence.fuelrats.com/display/public/FRKB/KGBFOAM"
        }
      }
    })
  }
}
