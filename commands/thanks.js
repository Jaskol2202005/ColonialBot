module.exports = {
  name: 'thanks',
  description: 'thank someone, and give them a snickers',
  usage: '@<whoever you want to thank>',
  args: true,
  execute(message, args) {
    if (message.mentions.members.size) {
      let mention = message.mentions.members.first()
      db.get(`snickers${mention}`).then(value => {
        let currentSnickers = value
        db.set(`snickers${mention}`, currentSnickers++)
        message.channel.send(`You gave ${mention} a Snickers!\nThey now have ${currentSnickers++} Snickers!`)
      })
    } else {
      message.channel.send(`Please mention the person you would like to thank`)
    }
  }
}
