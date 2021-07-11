const https = require('https');
const Database = require("@replit/database");
const db = new Database();
const moment = require('moment-timezone');

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

      db.get("lastTick").then(value => {
      let lastTick = value
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
                      content: `System couldn't be found, make sure you spelled it right!`
                    }
                  }
                })
              } else {
                let governmentUpper = faction.government.charAt(0).toUpperCase() + faction.government.slice(1)
                let allegianceUpper = faction.allegiance.charAt(0).toUpperCase() + faction.allegiance.slice(1)

                reply += `Faction: **${faction.name}**\nGovernment type: **${governmentUpper}**\nAllegiance: **${allegianceUpper}**\nEDDB link: https://eddb.io/faction/${faction.eddb_id}`

                let overflow = false

                for (var i = 0; i < presence.length; i++) {
                  if (reply.length >= 1900) {
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

                  reply += `\n\nFaction presence: **${presence[i].system_name}**\nState: **${presence[i].state.charAt(0).toUpperCase() + presence[i].state.slice(1)}**\nInfluence: **${Math.trunc(presence[i].influence * 100)}%**\nLast Updated: **${moment(presence[i].updated_at).format(`LLLL`)}**\nNeeds Update? `
                  if (lastUpdated < lastTick) {
                    reply += `Yes`
                  } else {
                    reply += `No`
                  }
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
              console.log('Error parsing JSON!');
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
      })
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
