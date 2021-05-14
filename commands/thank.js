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
      let reply = ``
      db.get(`snickers${mention}`).then(value => {
        let currentSnickers = value
        db.set(`snickers${mention}`, currentSnickers + 1)
        reply += `You gave <@${mention}> a Snickers!\nThey now have ${currentSnickers + 1} Snickers!`
        if (args[1]) {
          reply += `\n\nIncluded message: ${args[1].value}`
        }
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: reply
            }
          }
        })
      })
    }
  }
}
