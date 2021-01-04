//loads dependencies
const https = require('https');

module.exports = {
  name: 'carrier',
  description: 'finds where a carrier currently is + core services',
  usage: '<carrier id>',
  args: true,
  execute(message, args) {
    let reply = ''
    var options = {
        host: 'eddbapi.kodeblox.com',
        path: `/api/v4/stations?name=${args[0]}`,
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

                    console.log(data);

                    let latest = data.docs[data.docs.length - 1]

                    if (data.total === 0) {
                      message.reply(`Couldn't find that carrier (Make sure you spelled it right).`);
                      return;
                    }

                    let locationID = latest.system_id
                    let rearm = ''
                    let refuel = ''
                    let repair = ''

                    if (latest.has_rearm) {
                      rearm += `online`
                    } else {
                      rearm += `offline`
                    }
                    if (latest.has_refuel) {
                      refuel += `online`
                    } else {
                      refuel += `offline`
                    }
                    if (latest.has_repair) {
                      repair += `online`
                    } else {
                      repair += `offline`
                    }
                    reply += `**${latest.name}**\nCore services: Rearm: **${rearm.toUpperCase()}** | Refuel: **${refuel.toUpperCase()}** | Repair: **${repair.toUpperCase()}**\nCurrent location: `

                    var options = {
                        host: 'eddbapi.kodeblox.com',
                        path: `/api/v4/systems?eddbid=${locationID}`,
                        headers: {
                            'Accept': 'application/json'
                          }
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

                                    reply += `**${data.docs[0].name}**`

                                    message.channel.send(reply);
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
  }
}
