const Database = require("@replit/database"); //database dependency
const db = new Database();

module.exports = { //command for adding or removing members from the auth list
  name: 'matchmaking',
  description: 'command for pvp matchmaking',
  usage: '1v1|2v2|3v3|4v4, register|unregister|clear|queue',
  execute(interaction, args, client) {
    console.log(args[0].options);
    let matchup = args[0].name.charAt(0)
    db.get(`${matchup}queue`).then(value => {
      let matchupQueue = value
      db.get(`${matchup}queueNames`).then(value => {
        let matchupQueueNames = value
        let pos = matchupQueue.indexOf(interaction.member.user.id)
        if (args[1].name = "register" && pos === -1) {
          matchupQueue.push(interaction.member.user.id)
          db.set(`${matchup}queue`, matchupQueue)
          matchupQueueNames.push(interaction.member.user.username)
          db.set(`${matchup}queueNames`, matchupQueueNames)
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `<@${interaction.member.user.id}> added to ${matchup}v${matchup} queue`
              }
            }
          })
        } else if (args[1].name = "register") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `You're already in that queue!`
              }
            }
          })
        } else if (args[1].name = "unregister" && pos > -1) {
          matchupQueue.splice(pos, 1)
          db.set(`${matchup}queue`, matchupQueue)
          matchupQueueNames.splice(pos, 1)
          db.set(`${matchup}queueNames`, matchupQueueNames)
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `<@${interaction.member.user.id}> removed from ${matchup}v${matchup} queue`
              }
            }
          })
        } else if (args[1].name = "unregister") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `You're not in that queue!`
              }
            }
          })
        } else if (args[1].name = "clear" && matchupQueue.length > 0) {
          db.set(`${matchup}queue`, [])
          db.set(`${matchup}queueNames`, [])
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `${matchup}v${matchup} queue cleared`
              }
            }
          })
        } else if (args[1].name = "clear") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `Queue already empty!`
              }
            }
          })
        } else if (args[1].name = "queue" && matchupQueue.length > 0) {
          reply = `CMDRs in ${matchup}v${matchup} queue:`
          for (var i = 0; i < matchupQueue.length; i++) {
            reply += `\n${matchupQueueNames[i]}`
          }
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: reply
              }
            }
          })
        }
      })
    })
  }
}
