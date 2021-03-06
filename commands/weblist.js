module.exports = {
  name: 'weblist',
  description: `lists, links and gives a short desc. of a few 3rd party elite dangerous websites`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Find mostly anything related to trading, combat and player stats at: https://inara.cz\nFind accurate trading data at: https://eddb.io\nFind accurate exploration data at: https://edsm.net\nBuild ships virtually and test their stats at: https://coriolis.io and https://edsy.org\nFind mining hotspots and sell locations at: https://edtools.cc/miner\nNeutron highway and road to riches at: https://spansh.co.uk\nUseful material finding, fleet carrier calculators, and more at: https://cmdrs-toolbox.com/\nNeed fuel? https://fuelrats.com"
        }
      }
    })
  }
}
