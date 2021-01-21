module.exports = {
  name: 'search',
  description: 'does a global search on inara, sends link',
  usage: '',
  args: false,
  execute(message, args) {
    let reply = `Your search result: https://inara.cz/search/?formact=SEARCH_GLOBAL&searchglobal=${args[0]}`
    args.shift();
    for (var i = 0; i < args.length; i++) {
      reply += `+${args[i]}`
    }
    message.channel.send(reply);
  }
}
