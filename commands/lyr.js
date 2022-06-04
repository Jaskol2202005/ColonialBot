module.exports = {
  name: `lyr`,
  description: 'explains why the squad is pledged LYR',
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "If you've noticed that the squadron is pledged to LYR, this is because of a mistake that FDev doesn't want to fix. Some time ago Adama was messing with squadron settings in game and pledged to LYR, he thought it didn't save but it did. FDev doesn't want to do anything about it so we're just stuck with it. We are still an AD squad however and we support powerplay and bgs in that area."
        }
      }
    })
  }
}
