const nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();

module.exports = {
  name: 'destroy',
  description: 'destorys the discord client, ultimately killing the bot until a restart is induced',
  usage: '<nuclear code here>',
  args: true,
  execute(message, args) {
    let authorizedUsers = nconf.get(`authorizedUsers`)

    let pos = authorizedUsers.indexOf(message.author.id)

    if (pos > -1 && args[0] === `bot`) {
      message.channel.send(`Discord client shutting down, <!@637414359655514134> please turn me back on soon!`)
      process.exit(0)
    } else if (args[0] === `fed`) {
      message.channel.send(`:boom:\n\nFed destroyed!`)
    } else if (pos > -1) {
      message.reply(`Wrong nuclear code provided`)
    } else {
      message.reply(`You aren't authorized to use this command!`)
    }
  }
}
