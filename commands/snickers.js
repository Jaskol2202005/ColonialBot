const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'snickers',
  description: 'check how many snickers someone has',
  usage: '@<whoever you want to check>',
  args: true,
  execute(message, args) {
    if (message.mentions.members.size) {
      let mention = message.mentions.members.first()
      db.get(`snickers${mention.user.id}`).then(value => {
        let currentSnickers = value
        message.channel.send(`${mention} has ${currentSnickers} Snickers`)
      })
    } else {
      message.channel.reply(`Please mention the person you would like to check`)
    }
  }
}
