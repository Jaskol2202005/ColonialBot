const nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();

module.exports = {
  name: 'ignore',
  description: 'adds or removes a channel from the ignore list',
  usage: 'set|remove',
  args: true,
  execute(message, args) {
    let authorizedUsers = nconf.get(`authorizedUsers`)
    let authorPos = authorizedUsers.indexOf(message.author.id)
    if (authorPos !== -1) {
      if (args[0] === `set`) {
        let ignoreList = nconf.get(`ignoreList`)

        let posChannel = ignoreList.indexOf(message.channel.id)

        if (posChannel > -1) {
          message.reply(`This channel is already on the ignore list`)
          return;
        }

        ignoreList.push(message.channel.id)

        nconf.set(`ignoreList`, ignoreList)
        nconf.save(function (err) {
          if (err) {
            console.error(err.message);
            return;
          }
          message.channel.send('Current channel added to ignore list');
          return;
        });
      } else if (args[0] === `remove`) {
        let ignoreList = nconf.get(`ignoreList`)

        let posChannel = ignoreList.indexOf(message.channel.id)

        if (posChannel === -1) {
          message.reply(`This channel isn't on the ignore list, cannot remove`)
          return;
        }

        let newIgnoreList = ignoreList.splice(posChannel, 1)

        nconf.set(`ignoreList`, ignoreList)
        nconf.save(function (err) {
          if (err) {
            console.error(err.message);
            return;
          }
          message.channel.send('Current channel removed to ignore list');
          return;
        });
      }
    } else {
      message.reply(`You are not authorized to use this command!`)
    }
  }
}
