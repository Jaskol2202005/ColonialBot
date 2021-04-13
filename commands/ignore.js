const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'ignore',
  description: 'adds or removes a channel from the ignore list',
  usage: 'set|remove <#channel>',
  execute(interaction, args, client) {
    db.get("authorizedUsers").then(value => {
      let authorizedUsers = value
      let authorPos = authorizedUsers.indexOf(interaction.member.user.id || interaction.user.id)
      if (authorPos !== -1) {
        db.get("ignoreList").then(value => {

          let ignoreList = value
          if (args[0].name === `set`) {

            let posChannel = ignoreList.indexOf(args[0].options[0].value)

            if (posChannel > -1) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: "This channel is already on the ignore list"
                  }
                }
              })
              return;
            }

            ignoreList.push(args[0].options[0].value)

            db.set("ignoreList", ignoreList).then(() => {});
            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: "Channel added successfully to ignore list"
                }
              }
            })
          } else if (args[0].name === `remove`) {

            let posChannel = ignoreList.indexOf(args[0].options[0].value)

            if (posChannel === -1) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: "This channel isn't on the ignore list, cannot remove"
                  }
                }
              })
              return;
            }

            let newIgnoreList = ignoreList.splice(posChannel, 1)

            db.set("ignoreList", ignoreList).then(() => {});
            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: "Channel removed successfully from ignore list"
                }
              }
            })
          }
        });
      } else {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: "You are not authorized to use this command!"
            }
          }
        })
      }
    });
  }
}
