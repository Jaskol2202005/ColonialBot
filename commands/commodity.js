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
          db.set("errorStatus", 0).then(() => {});
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
      db.get("errorStatus").then(value => {
        if (value === 1) {
          return;
        } else {
          db.set("errorStatus", 1).then(() => {});
          client.channels.cache.get(`715038247964639282`).send(`Error Encountered, Error code: ${err}`)
        }
      });
    });
  }
}
