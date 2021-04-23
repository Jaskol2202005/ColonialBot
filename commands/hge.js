module.exports = {
  name: 'hge',
  description: `explains HGEs and gives you which states give what mats`,
  usage: `states | explained`,
  execute(interaction, args, client) {
    if (args[0].name === `states`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `The following are a list of where to find high grade emissions that contain desired grade 5 manufactured engineering materials.\nMake sure to use https://inara.cz/nearest/ to locate these, as using just the galaxy map may not show you all of the results that will work.\nMake sure you're looking for systems with a population above 10 million or so for optimal results.\n\nFederal systems: Core Dynamics Composites + Proprietary Composites\nImperial systems: Imperial Shielding\nCivil Unrest system faction states: Improvised Components\nWar or Civil War system faction states:  Military Grade Alloys + Military Supercapacitors\nOutbreak system faction states: Pharmaceutical Isolators\nBoom faction system states: Proto Heat Radiators + Proto Light Alloys + Proto Radiolic Alloys`
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `High grade emissions are an easy method to collect high grade g5 and g4 manufactured materials. All you need is a jumpship, and a few collector limpets.\nhttps://youtu.be/-4HClk1cRIo?t=183`
          }
        }
      })
    }
  }
}
