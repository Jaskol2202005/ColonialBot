const https = require('https');

module.exports = {
  name: 'faction',
  description: 'Looks for faction details',
  usage: '<faction name>',
  args: true,
  execute(message, args) {
    var options = {
        host: 'elitebgs.app',
        path: `/api/ebgs/v4/factions?name=${args[0]}`,
        headers: {
            'Accept': 'application/json'
          }
        };

        args.shift()
        for (var i = 0; i < args.length; i++) {
          options.path += `+${args[i]}`;
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

                    let faction = data.docs[0]
                    let presence = faction.faction_presence

                    console.log(data);
                    console.log(data.docs[0].faction_presence)
                    console.log(presence[0].active_states);

                    let reply = ``

                    if (data.total === 0) {
                      message.reply(`System couldn't be found, make sure you spelled it right!`)
                    } else {
                      let governmentUpper = faction.government.charAt(0).toUpperCase() + faction.government.slice(1)
                      let allegianceUpper = faction.allegiance.charAt(0).toUpperCase() + faction.allegiance.slice(1)

                      reply += `Faction: **${faction.name}**\nGovernment type: **${governmentUpper}**\nAllegiance: **${allegianceUpper}**\nEDDB link: https://eddb.io/faction/${faction.eddb_id}`

                      for (var i = 0; i < presence.length; i++) {
                        reply += `\n\nFaction presence: **${presence[i].system_name}**\nState: **${presence[i].state.charAt(0).toUpperCase() + presence[i].state.slice(1)}**\nInfluence: **${Math.trunc(presence[i].influence * 100)}%**`
                      }
                      message.channel.send(reply)
                    }
                  } catch (e) {
                    console.log('Error parsing JSON!');
                    message.channel.send(`Couldn't find this faction, make sure you spelled it right!\n\n*If you're 100% sure you spelled it right, faction may be restricted or the bot is broken*`)
                  }
                } else {
                  console.log('Status:', res.statusCode);
                }
              });
            }).on('error', function (err) {
              console.log('Error:', err);
            });
  },
};
