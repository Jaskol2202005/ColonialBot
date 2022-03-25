const request = require('request');

module.exports = {
  name: 'cat',
  description: 'Sends a cat photo',
  usage: '',
  execute(interaction, args, client) {
    request.get('http://thecatapi.com/api/images/get?format=src&type=png', {      
    },
    function(error, response, body) {
	    if(!error && response.statusCode == 200) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: response.request.uri.href
            }
          }
        })
	    } else {
		    console.log(error);
	    }
    })
  }
}
