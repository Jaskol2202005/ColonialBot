const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'authorization',
  description: 'add or remove authorized users',
  usage: 'add|remove <@person you want to modify>',
  execute(interaction, args, client) {
    db.get("authorizedUsers").then(value => {
    let authorizedUsers = value

    let pos = authorizedUsers.indexOf(interaction.member.user.id)
    if (pos > -1) {
      if (args[0].name === `add` && args.length > 1) {
        let newAuth = interaction.data.resolved.users.id

        let pos1 = authorizedUsers.indexOf(newAuth)
        if (pos1 > -1) {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "This member is already authorized!"
              }
            }
          })
        } else {
          authorizedUsers.push(newAuth)

          db.set("authorizedUsers", authorizedUsers).then(() => {});
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "Full access member added successfully"
              }
            }
          })
        }
      } else if (args[0].name === `remove` && args.length > 1) {
        let newAuth = interaction.data.resolved.users.id

        let pos1 = authorizedUsers.indexOf(newAuth)
        if (pos1 === -1) {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "This member isn't authorized, can't remove!"
              }
            }
          })
        } else {
          authorizedUsers.splice(pos1, 1)

          db.set("authorizedUsers", authorizedUsers).then(() => {});
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "Full access member removed successfully"
              }
            }
          })
        }
      } else {
        let newAuth = interaction.data.resolved.users.id

        let pos1 = authorizedUsers.indexOf(newAuth)
        if (pos1 > -1) {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "This member has full authorization with this bot"
              }
            }
          })
        } else {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "This member doesn't have authorization with this bot"
              }
            }
          })
        }
      }
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "You aren't authorized to use this command"
          }
        }
      })
    }
  });
  }
}
