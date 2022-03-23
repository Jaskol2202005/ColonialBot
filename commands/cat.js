const https = require('https');

module.exports = {
  name: 'cat',
  description: 'Sends a cat photo',
  usage: '',
  execute(interaction, args, client) {
    var options = {
      host: 'thecatapi.com',
      path: `/api/images/get?format=src&type=png`,
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
            console.log(data);
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
        }
      })
    })
  }
}
