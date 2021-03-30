const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'eat',
  description: 'eat your tressured snickers',
  usage: '',
  execute(interaction, args, client) {
    let mention = interaction.member.user.id
    db.get(`snickers${mention}`).then(value => {
      let currentSnickers = value
      if (currentSnickers < 1) {
        message.reply(`You have no snickers, sorry no snack for you :(`)
      } else {
        message.reply(`You're not you when you're hungry, have a Snickers!\nYou now have ${currentSnickers - 1} Snickers`)
        db.set(`snickers${mention}`, currentSnickers - 1)
      }
    })
  }
}
