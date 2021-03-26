module.exports = {
  name: 'merits',
  description: 'lists a quick description on how to earn and maintain merits for powerplay',
  usage: 'append combat or delivery to the end to get specific information',
  args: false,
  execute(message, args) {
    if (args[0] === `combat`) {
      message.channel.send(`The combat way of making merits is as it says on the tin, combat.\n\nFind a system in the process of undermining (look on rival factions control tabs under galactic powers), go there in a combat ship, and follow the steps in this image to maximize the amount of merits earned https://imgur.com/a/25aDCCy`)
    } else if (args[0] === `delivery`) {
      message.channel.send(`The delivery method of making merits can be a lot faster, but also requires quite a few credits to be able to do optimally\n\nFor fortification, go to Cubeo, pick up a cargo full of Aisling Programme Materials, then find a system in need of fortification (Check under control tab in Aisling's powerplay tab), and deliver the materials.\n\nAlternatively, and only if it is specified directly in the <#764097736689451028> channel, you can pick up Aisling Media Materials from **any** Aisling control system, and deliver it to a system in the process of preparation (Check preparation tab under Aisling powerplay). The next cycle, under a successful system preparation, Aisling Sealed Contracts can be delivered to the prepared system.`)
    } else {
      message.channel.send(`Merits can be made in 2 ways, combat and delivery. While combat requires a moderately okay combat ship and a bit of skill, delivery requires a cargo ship and some credits to make the merit making process faster. Both methods are useful to Aisling's overall powerplay, and both can make you some merits fairly quickly.\n\nYou can check each method out separately by typing "/merits combat" and "/merits delivery".`)
    }
  }
}
