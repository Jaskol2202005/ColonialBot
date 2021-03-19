const axios = require('axios');

module.exports = {
  name: 'cg',
  description: 'Returns details of ongoing or recently finished community goals as are recorded on Inara.',
  usage: '',
  args: false,
  execute(message, args) {
    let reply = ''
    var currentTime = new Date();
    axios.post('https://inara.cz/inapi/v1/', {
      header: {
        appName: 'TRCGbot',
        appVersion: `1.0.0`,
        isDeveloped: `true`,
        APIkey: `28r9agl7t5a8gw880cc0wgcowc84k8k0kgsc4k`
      },
      events: [
        {
          eventName: `getCommunityGoalsRecent`,
          eventTimestamp: `${currentTime.toISOString()}`,
          eventData: []
        }
      ]
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
