module.exports = {
  name: 'welcome',
  description: 'sends welcome message',
  usage: '<@commander>',
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: `<@${args[0].value}>, Welcome! Glad to have you! We're a friendly and casual group, please feel free to contribute or start a conversation.  Ask questions, look for wing mates and make friends!\n\nIf you'd like to join our in game squadron, submit an in game application (search TRCG) and I will approve it within a day or two, if not right away. This will earn you a rank promotion inside our Discord server here, opening up further specialized channels, but there's no obligation and you're welcome to remain as a guest with us.\nIf you've joined in-game, you can also join us on [inara](https://inara.cz/squadron/9718/)\n\nIf you're interested in getting involved with the squadron, check out the pins :pushpin: here in <#568739421105684480> to get an idea on our ranks, and what we do!`
        }
      }
    })
  }
}
