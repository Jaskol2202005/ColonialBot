const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'snickers',
  description: 'check how many snickers someone has',
  usage: '@<whoever you want to check>',
  args: false,
  execute(message, args) {
    try {
      let mention = message.mentions.members.first()
      db.get(`snickers${mention.user.id}`).then(value => {
        let currentSnickers = value
        message.channel.send(`${mention} has ${currentSnickers} Snickers`)
      })
    } catch (e) {
      let author = message.author.id
      db.get(`snickers${author}`).then(value => {
        let currentSnickers = value
        message.channel.send(`${author} has ${currentSnickers} Snickers`)
      })
    }
  }
}
