const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'ignore',
  description: 'adds or removes a channel from the ignore list',
  usage: 'set|remove',
  args: true,
  execute(message, args) {
    db.get("authorizedUsers").then(value => {
      let authorizedUsers = value
      let authorPos = authorizedUsers.indexOf(message.author.id)
      if (authorPos !== -1) {
        db.get("ignoreList").then(value => {

          let ignoreList = value
          if (args[0] === `set`) {

            let posChannel = ignoreList.indexOf(message.channel.id)

            if (posChannel > -1) {
              message.reply(`This channel is already on the ignore list`)
              return;
            }

            ignoreList.push(message.channel.id)

            db.set("ignoreList", ignoreList).then(() => {});
            message.channel.send(`Channel added successfully to ignore list`)
          } else if (args[0] === `remove`) {

            let posChannel = ignoreList.indexOf(message.channel.id)

            if (posChannel === -1) {
              message.reply(`This channel isn't on the ignore list, cannot remove`)
              return;
            }

            let newIgnoreList = ignoreList.splice(posChannel, 1)

            db.set("ignoreList", ignoreList).then(() => {});
            message.channel.send(`Channel removed successfully from ignore list`)
          }
        });
      } else {
        message.reply(`You are not authorized to use this command!`)
      }
    });
  }
}
