const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'snickers',
  description: 'check how many snickers someone has',
  usage: '@<whoever you want to check>',
  execute(interaction, args, client) {
    db.get(`snickers${args[0].value}`).then(value => {
      let currentSnickers = value
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `<@${args[0].value}> has ${currentSnickers} Snickers`
          }
        }
      })
    })
  }
}
