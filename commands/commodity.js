const https = require('https');

module.exports = {
  name: 'commodity',
  description: 'finds commodity prices and locationsa',
  usage: '',
  args: false,
  execute(message, args) {
    var options = {
      host: 'eddbapi.kodeblox.com',
      path: `/api/v4/stations?commodities=low+temperature+diamonds`,
      headers: {
        'Accept': 'application/json'
      }
    };

    https.get(options, function(res) {
      var json = '';

      res.on('data', function(chunk) {
        json += chunk;
      });

      res.on('end', function() {
        if (res.statusCode === 200) {
          try {
            var data = JSON.parse(json);
            console.log(data);
          } catch (e) {
            console.log('Error parsing JSON!');
          }
        } else {
          console.log('Status:', res.statusCode);
        }
      });
    }).on('error', function(err) {
      console.log('Error:', err);
    });
  }
}
