const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'thank',
  cooldown: 1800,
  description: 'thank someone, and give them a snickers',
  usage: '@<whoever you want to thank>',
  args: true,
  execute(message, args) {
    if (message.mentions.members.size) {
      let mention = message.mentions.members.first()
      if (mention.user.id === message.author.id) {
        message.reply(`You can't thank yourself dummy`)
      } else {
        db.get(`snickers${mention.user.id}`).then(value => {
          let currentSnickers = value
          db.set(`snickers${mention.user.id}`, currentSnickers + 1)
          message.channel.send(`You gave ${mention} a Snickers!\nThey now have ${currentSnickers + 1} Snickers!`)
        })
      }
    } else {
      message.channel.reply(`Please mention the person you would like to thank`)
    }
  }
}
