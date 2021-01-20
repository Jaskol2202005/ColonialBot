const nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();

module.exports = {
  name: 'authorization',
  description: 'add or remove authorized users',
  usage: 'add|remove <@person you want to modify>',
  args: true,
  execute(message, args) {
    console.log(message.mentions.users.first().id);
    let authorizedUsers = nconf.get(`authorizedUsers`)

    let pos = authorizedUsers.indexOf(message.author.id)
    if (pos > -1) {
      if (args[0] === `add` && args.length > 1) {
        let newAuth = message.mentions.users.first().id

        let pos1 = authorizedUsers.indexOf(newAuth)
        if (pos1 > -1) {
          message.reply(`This member is already authorized!`)
        } else {
          authorizedUsers.push(newAuth)

          nconf.set(`authorizedUsers`, authorizedUsers)
          nconf.save(function (err) {
            if (err) {
              console.error(err.message);
              return;
            }
            message.channel.send('User added successfully!');
          });
        }
      } else if (args[0] === `remove` && args.length > 1) {
        let newAuth = message.mentions.users.first().id

        let pos1 = authorizedUsers.indexOf(newAuth)
        if (pos1 === -1) {
          message.reply(`This member isn't authorized, can't remove!`)
        } else {
          authorizedUsers.splice(pos1, 1)

          nconf.set(`authorizedUsers`, authorizedUsers)
          nconf.save(function (err) {
            if (err) {
              console.error(err.message);
              return;
            }
            message.channel.send('User removed successfully!');
          });
        }
      } else {
        let newAuth = message.mentions.users.first().id

        let pos1 = authorizedUsers.indexOf(newAuth)
        if (pos1 > -1) {
          message.channel.send(`This member has full authorization with this bot`)
        } else {
          message.channel.send(`This member doesn't have authorization with this bot`)
        }
      }
    } else {
      message.reply(`You aren't authorized to use this command!`)
    }
  }
}
