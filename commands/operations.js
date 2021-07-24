const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'operations',
  description: 'add or remove operations from the database, used to delete opsec breaches',
  usage: 'add|remove|clear <thing you want to censor>',
  execute(interaction, args, client) {
    db.get("ignoreList").then(value => {
      let pos9000 = value.indexOf(interaction.channel_id)
      if (pos9000 !== -1) {
      db.get("authorizedUsers").then(value => {
        let pos = interaction.member.user.id
        let position = value.indexOf(pos)
        if (position !== -1) {
        db.get("currentOperations").then(value => {
          let currentOperations = value
          if (args[0].name === `add`) {
            let nextOperation = args[0].options[0].value.toLowerCase()

            let pos1 = currentOperations.indexOf(nextOperation);

            if (pos1 > -1) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: "This operation is already in the database"
                  }
                }
              })
              return;
            }

            let newOperations = currentOperations.push(nextOperation)

            db.set("currentOperations", currentOperations).then(() => {});
            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: `Operation ${nextOperation} added successfully`
                }
              }
            })
          } else if (args[0].name === `remove`) {
            let removedOperation = args[0].options[0].value.toLowerCase()

            let pos1 = currentOperations.indexOf(removedOperation)

            if (pos1 === -1) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: "Couldn't find this operation in the database"
                  }
                }
              })
              return;
            }

            currentOperations.splice(pos1, 1)

            db.set("currentOperations", currentOperations).then(() => {});
            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: `Operation ${removedOperation} removed successfully`
                }
              }
            })
          } else if (args[0].name === `clear`) {
            if (currentOperations.length === 0) {
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: "Database is already empty!"
                  }
                }
              })
            } else {
              let clear = []
              db.set("currentOperations", clear).then(() => {});
              client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: {
                    content: "Operations cleared successfully"
                  }
                }
              })
            }
          } else {
            let reply = 'Current operations:'
            if (currentOperations.length === 0) {
              reply = `No operations are currently set`
            } else {
              for (var i = 0; i < currentOperations.length; i++) {
                let currentOperationsUpperCase = currentOperations[i].charAt(0).toUpperCase() + currentOperations[i].slice(1)
                reply += `\n**${currentOperationsUpperCase}**`
              }
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
        });
      } else if (args[0].name === "check") {
          let reply = 'Current operations:'
          db.get("currentOperations").then(value => {
            let currentOperations = value
            if (currentOperations.length === 0) {
              reply = `No operations are currently set`
            } else {
              for (var i = 0; i < currentOperations.length; i++) {
                let currentOperationsUpperCase = currentOperations[i].charAt(0).toUpperCase() + currentOperations[i].slice(1)
                reply += `\n**${currentOperationsUpperCase}**`
              }
            }
            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: reply
                }
              }
            })
          });
        } else {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: "You aren't authorized to use this command!"
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
              content: "You aren't authorized to use this command!"
            }
          }
        })
      }
    });
  }
}
