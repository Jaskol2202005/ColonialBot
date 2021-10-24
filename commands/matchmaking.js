const Database = require("@replit/database"); //database dependency
const db = new Database();
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

module.exports = { //command for adding or removing members from the auth list
  name: 'matchmaking',
  description: 'command for pvp matchmaking',
  usage: '1v1|2v2|3v3|4v4, register|unregister|clear|queue',
  execute(interaction, args, client) {
    let matchup = args[0].name.charAt(0)
    db.get(`${matchup}queue`).then(value => {
      let matchupQueue = value
      db.get(`${matchup}queueNames`).then(value => {
        let matchupQueueNames = value
        let pos = matchupQueue.indexOf(interaction.member.user.id)
        if (args[0].options[0].name === "register" && pos === -1) {
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
          if (matchupQueue.length === matchup * 2) {
            db.set(`activeFight${matchup}`, matchupQueue)
            db.set(`${matchup}queue`, [])
            db.set(`${matchup}queue`, [])
            let reply = `${matchup}v${matchup} queue full, randomized teams:\n`
            let team1 = matchupQueue.slice(0, matchupQueue.length / 2)
            let team2 = matchupQueue.slice(matchupQueue.length / -2)
            for (var i = 0; i < team1.length; i++) {
              reply += `<@team1[i]> `
            }
            reply += `\n vs \n`
            for (var i = 0; i < team2.length; i++) {
              reaply += `<@team2[i]> `
            }
            client.channels.cache.get(`708839430307184756`).send(reply)
          }
        } else if (args[0].options[0].name === "register") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `You're already in that queue!`
              }
            }
          })
        } else if (args[0].options[0].name === "unregister" && pos > -1) {
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
        } else if (args[0].options[0].name === "unregister") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `You're not in that queue!`
              }
            }
          })
        } else if (args[0].options[0].name === "clear" && matchupQueue.length > 0) {
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
        } else if (args[0].options[0].name === "clear") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `Queue already empty!`
              }
            }
          })
        } else if (args[0].options[0].name === "queue" && matchupQueue.length > 0) {
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
        } else {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "No one in queue"
              }
            }
          })
        }
      })
    })
  }
}
