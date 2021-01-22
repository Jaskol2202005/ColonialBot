module.exports = {
  name: 'welcome',
  description: 'sends welcome message',
  usage: '<commander name, or @>',
  args: false,
  execute(message, args) {
    let reply = ''
    for (var i = 0; i < args.length; i++) {
      let nameUpper = args[i].charAt(0).toUpperCase() + args[i].slice(1)
      reply += `${nameUpper} `
    }
    reply += `, Welcome! Glad to have you! We're a friendly and casual group, please feel free to contribute or start a conversation.  Ask questions, look for wing mates and make friends!\n\nIf you'd like to join our in game squadron, submit an in game application (search TRCG) and I will approve it within a day or two, if not right away. This will earn you a rank promotion inside our Discord server here, opening up further specialized channels, but there's no obligation and you're welcome to remain as a guest with us.\nIf you've joined in-game, you can also join us on inara at: https://inara.cz/squadron/9718/\n\nIf you're interested in getting involved with the squadron, check out the pins :pushpin: here in #general-chat to get an idea on our ranks, and what we do!`
    message.channel.send(reply);
  }
}
