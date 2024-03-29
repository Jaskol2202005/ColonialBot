const https = require('https');
const Database = require("@replit/database");
const db = new Database();
const moment = require('moment-timezone');
function firstCharUpper(string) {
  string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  name: 'faction',
  description: 'Looks for faction details',
  usage: '<faction name>',
  execute(interaction, args, client) {
    if (interaction.channel_id === '715038247964639282' || interaction.channel_id === '781456276911685653' || interaction.channel_id === '831563438571913247' || interaction.channel_id === '831847459205545994') {
      let array = args[0].value.toLowerCase().split(/ +/);
      var options = {
        host: 'elitebgs.app',
        path: `/api/ebgs/v5/factions?name=${array[0]}`,
        headers: {
          'Accept': 'application/json'
        }
      };

      array.shift()
      for (var i = 0; i < array.length; i++) {
        options.path += `+${array[i]}`;
      };
      https.get(options, function (res) {
        var json = '';

        res.on('data', function (chunk) {
          json += chunk;
        });

        res.on('end', function () {
          if (res.statusCode === 200) {
            try {
              var data = JSON.parse(json);
              console.log(data.docs[0]);


                let faction = data.docs[0]
                let presence = faction.faction_presence

                let reply = ``

                if (data.total === 0) {
                  client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                      type: 4,
                      data: {
                        content: `Faction couldn't be found, make sure you spelled it right!`
                      }
                    }
                  })
                } else {
                  let governmentUpper = firstCharUpper(faction.government)
                  let allegianceUpper = firstCharUpper(faction.allegiance)

                  reply += `Faction: **${faction.name}**\nGovernment type: **${governmentUpper}**\nAllegiance: **${allegianceUpper}**\nEDDB link: https://eddb.io/faction/${faction.eddb_id}`

                  let overflow = false

                  for (var i = 0; i < presence.length; i++) {
                    if (reply.length >= 1750) {
                      if (overflow === true) {
                        client.channels.cache.get(interaction.channel_id).send(reply)
                        overflow = false
                      } else {
                        client.api.interactions(interaction.id, interaction.token).callback.post({
                          data: {
                            type: 4,
                            data: {
                              content: reply
                            }
                          }
                        })
                        reply = ``
                        overflow = true
                      }
                    }

                    let lastUpdated = moment(presence[i].updated_at).toISOString()

                    console.log(presence[i]);

                    reply += `\n\nFaction presence: **${presence[i].system_name}**\nInfluence: **${Math.trunc(presence[i].influence * 100)}%**\nActive state: `
                    if (presence[i].active_states.length === 0) {
                      reply += `**None**`
                    } else {
                      for (var j = 0; j < presence[i].active_states.length; i++) {
                        reply += `${firstCharUpper(presence[i].active_states[j].state)},`
                      }
                      reply.slice(0, -1);
                      console.log(`active state check pass ${i}`);
                    }
                    if (presence[i].pending_states.length === 0) {
                    } else {
                      reply += `\nPending states: `
                      for (var j = 0; j < presence[i].pending_states.length; i++) {
                        reply += `${firstCharUpper(presence[i].pending_states[j].state)},`
                      }
                      reply.slice(0, -1);
                      console.log(`pending state check pass ${i}`);
                    }
                    if (presence[i].recovering_states.length === 0) {
                    } else {
                      reply += `\nRecovering states: `
                      for (var j = 0; j < presence[i].recovering_states.length; i++) {
                        reply += `${firstCharUpper(presence[i].recovering_states[j].state)},`
                      }
                      reply.slice(0, -1);
                      console.log(`recovering state check pass ${i}`);
                    }
                    if (presence[i].conflicts.length !== 0) {
                      reply += `\nFaction currently in a ${presence[i].conflicts[0].type}, ${presence[i].conflicts[0].days_won} days won`
                    } else {
                      reply += `\nNo conflict reported`
                    }
                    reply += `\nLast Updated: **<t:${moment(presence[i].updated_at).unix()}:F>, <t:${moment(presence[i].updated_at).unix()}:R>**\nNeeds Update? `

                  }
                  if (overflow === true) {
                    client.channels.cache.get(interaction.channel_id).send(reply)
                  } else {
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                      data: {
                        type: 4,
                        data: {
                          content: reply
                        }
                      }
                    })
                  }
                }
            } catch (e) {
              console.log(`Error parsing JSON! ${e}`);
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: `Couldn't find this faction, make sure you spelled it right!\n\n*If you're 100% sure you spelled it right, faction may be restricted or the bot is broken*`
                  }
                }
              })
            }
          } else {
            console.log('Status:', res.statusCode);
          }
        });
      }).on('error', function (err) {
        console.log('Error:', err);
      });
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `To reduce clutter and minimize spam, please use <#781456276911685653>`
          }
        }
      })
    }
  },
};
