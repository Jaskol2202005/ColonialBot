const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'thank',
  description: 'thank someone, and give them a snickers',
  cooldown: `600`,
  usage: '@<whoever you want to thank>',
  execute(interaction, args, client) {
    let mention = args[0].value
    if (mention === interaction.member.user.id) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `You can't thank yourself dummy`
          }
        }
      })
    } else {
      db.get(`snickers${mention}`).then(value => {
        let currentSnickers = value
        db.set(`snickers${mention}`, currentSnickers + 1)
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `You gave <@${mention}> a Snickers!\nThey now have ${currentSnickers + 1} Snickers!`
            }
          }
        })
      })
    }
  }
}
