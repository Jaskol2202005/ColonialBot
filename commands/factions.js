const https = require('https');

module.exports = {
  name: 'factions',
  description: 'Looks for factions in a certain system',
  usage: '<system name>',
  execute(interaction, args, client) {
    let array = args[0].value.toLowerCase().split(/ +/);
    var options = {
      host: 'www.edsm.net',
      path: `/api-system-v1/factions?systemName=${array[0]}`,
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
            console.log(json);

            if (json === `{}`) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: `Couldn't find that system (Make sure you spelled it right).`
                  }
                }
              })
            } else if (data.factions.length === 0) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: `This system doesn't have any factions.`
                  }
                }
              })
            }
            let reply = `**${data.name}** - Current state: ${data.factions[0].state}\n\nFactions:\n`;

            for (var i = 0; i < data.factions.length; i++) {
              if (data.factions[i].influence > 0) {
                if (data.factions[i].isPlayer) {
                  reply += `(Player) `
                }
                reply += `**${data.factions[i].name}** - ${Math.trunc(data.factions[i].influence*1000)/10}%\n`;
              }
            }

            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: reply
                }
              }
            })
          } catch (e) {
            console.log('Error parsing JSON!');
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
