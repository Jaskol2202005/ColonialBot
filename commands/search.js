module.exports = {
  name: 'search',
  description: 'does a global search on inara, sends link',
  usage: '',
  args: false,
  execute(interaction, args, client) {
    let array = args[0].value.toLowerCase().split(/ +/);
    let reply = `Your search result: https://inara.cz/search/?search=${array[0]}`
    array.shift();
    for (var i = 0; i < array.length; i++) {
      reply += `+${array[i]}`
    }
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
