const Database = require("@replit/database"); //database dependency
const db = new Database();
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

module.exports = { //command for adding or removing members from the auth list
  name: 'reroll',
  description: 'Reroll a current active PvP fight',
  usage: '1v1|2v2|3v3|4v4',
  execute(interaction, args, client) {
    let matchup = args[0].name.charAt(0)
    db.get(`activeFight${matchup}`).then(value => {
      let fighters = value
      let reply = `${matchup}v${matchup} queue full, randomized teams:\n`
      let team1 = matchupQueue.slice(0, matchupQueue.length / 2)
      let team2 = matchupQueue.slice(matchupQueue.length / -2)
      for (var i = 0; i < team1.length; i++) {
        reply += `<@${team1[i]}> `
      }
      reply += `\n vs \n`
      for (var i = 0; i < team2.length; i++) {
        reply += `<@${team2[i]}> `
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
