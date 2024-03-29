module.exports = {
  name: 'merits',
  description: 'lists a quick description on how to earn and maintain merits for powerplay',
  usage: 'append combat or delivery to the end to get specific information',
  execute(interaction, args, client) {
    if (args[0].name === `combat`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "The combat way of making merits is as it says on the tin, combat.\n\nFind a system in the process of undermining (look on rival factions control tabs under galactic powers), go there in a combat ship, and follow the steps in this image to maximize the amount of merits earned https://imgur.com/a/25aDCCy"
          }
        }
      })
    } else if (args[0].name === `delivery`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "The delivery method of making merits can be a lot faster, but also requires quite a few credits to be able to do optimally\n\nFor fortification, go to one of the stations in Cubeo, select the powerplay contact under contacts at the station, and pick up a cargo full of Aisling Programme Materials, then check the ADC Trello (https://trello.com/b/HBY3rRZR/aisling-duval) for a system in the middle column above the completed line, and deliver the materials to the power contact in that system.\n\nIf all of the objectives are completed but you still need merits, you can deliver Aisling Programme Materials from Cubeo to Lamba-1 Tucanae, or Aisling Media Materials from Simyr to Na Chac Og"
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Merits can be made in 2 ways, combat and delivery. While combat requires a moderately okay combat ship and a bit of skill, delivery requires a cargo ship and some credits to make the merit making process faster. Both methods are useful to Aisling's overall powerplay, and both can make you some merits fairly quickly.\n\nYou can check each method out separately by typing "/merits combat" and "/merits delivery".`
          }
        }
      })
    }
  }
}
