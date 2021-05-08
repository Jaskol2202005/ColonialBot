const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'destroy',
  description: `destroys the target, yes, they're dead now`,
  usage: '<target>',
  args: true,
  execute(interaction, args, client) {
    db.get("authorizedUsers").then(value => {
      let authorizedUsers = value

      let pos = authorizedUsers.indexOf(interaction.member.user.id)

      args[0].value.replace(/[\]\-\^\\\[/!@#$%&*(){}|;:'",.<>?~`=+_]/g, ` `).toLowerCase().split(/ +/)

      if (pos > -1 && args[0].value === `bot`) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `Discord client shutting down, <!@637414359655514134> please turn me back on soon!`
            }
          }
        })
        process.exit(0)
      } else if (args[0].value.indexOf(`empire`) > -1 || args[0].value.indexOf(`imperial`) > -1 || args[0].value.indexOf(`the princess`) > -1 || args[0].value.indexOf(`aisling`) > -1
          data: {
            type: 4,
            data: {
              content: `You do realize this is an Imperial server... right?`
            }
          }
        })
      } else if (args[0].value !== `bot`) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `:boom::boom::boom:\n\n${args[0].value} destroyed!`
            }
          }
        })
      } else {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `You aren't authorized to use this command!`
            }
          }
        })
      }
    });
  }
}
