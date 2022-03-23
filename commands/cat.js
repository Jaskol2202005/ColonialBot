const https = require('https');

module.exports = {
  name: 'cat',
  description: 'Sends a cat photo',
  usage: '',
  execute(interaction, args, client) {
    var options = {
      host: 'thecatapi.com',
      path: `/v1/images/search`,
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
          console.log(json);
          try {
            var data = JSON.parse(json);
            console.log(data);
          } catch (e) {
            console.log(`Error parsing JSON! ${e}`);
          }
        }
      })
    })
  }
}
