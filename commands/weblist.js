module.exports = {
  name: 'weblist',
  description: `lists, links and gives a short desc. of a few 3rd party elite dangerous websites`,
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Use \<[inara](https://inara.cz)\> for finding virtually anything in-game\nUse \<[EDDB](https://eddb.io)\> for accurate and easily accesible ttrading data\nUse \<[EDSM](https://edsm.net)\> for finding systems and what resides in them\nBuild ships virtually and test their stats at \<[Coriolis](https://coriolis.io)\> and \<[EDSY](https://edsy.org)\>\nFind mining hotspots and sell locations as well as other niche data on \<[EDTools](https://edtools.cc/miner)\>\nEfficient neutron plotter and road to riches on \<[Spansh](https://spansh.co.uk)\>\n\<[Cmdr's Toolbox](https://cmdrs-toolbox.com)\>, a useful material finder, fleet carrier calculator, and more\n\<[Need fuel?](https://fuelrats.com)\>"
        }
      }
    })
  }
}
