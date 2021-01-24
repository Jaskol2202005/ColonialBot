const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: 'operations',
  description: 'add or remove operations from the database, used to delete opsec breaches',
  usage: 'add|remove|clear <thing you want to censor>',
  args: false,
  execute(message, args) {
    db.get("ignoreList").then(value => {
      let pos9000 = value.indexOf(message.channel.id)
      if (pos9000 !== -1) {
      db.get("authorizedUsers").then(value => {
        let position = value.indexOf(message.author.id)
        if (position !== -1) {
        db.get("currentOperations").then(value => {
          let currentOperations = value
          if (args[0] === `add`) {
            args.shift()
            let nextOperation = ''
            for (var i = 0; i < args.length; i++) {
              nextOperation += `${args[i]} `
            }

              let currentOperations = value
              var edittedOperation = nextOperation.slice(0, -1);

              let pos1 = currentOperations.indexOf(edittedOperation);

              if (pos1 > -1) {
                message.channel.send(`This operation is already in the database`)
                return;
              }

              let newOperations = currentOperations.push(edittedOperation)

              db.set("currentOperations", currentOperations).then(() => {});
              message.channel.send(`Operation added successfully`)
          } else if (args[0] === `remove`) {
            args.shift()
            let removedOperation = ''
            for (var i = 0; i < args.length; i++) {
              removedOperation += `${args[i]} `
            }

            var edittedOperation = removedOperation.slice(0, -1);

            let pos1 = currentOperations.indexOf(`${edittedOperation}`)

            if (pos1 === -1) {
              message.channel.send(`Couldn't find this operation in the database`);
              return;
            }

            currentOperations.splice(pos1, 1)

            db.set("currentOperations", currentOperations).then(() => {});
            message.channel.send(`Operation removed successfully`)
          } else if (args[0] === `clear`) {
            if (currentOperations.length === 0) {
              message.reply(`Database is already empty!`)
            } else {
              let clear = []
              db.set("currentOperations", currentOperations).then(() => {});
              message.channel.send(`Operations cleared successfully`)
            }
          } else if (args.length === 0) {
            let reply = 'Current operations:'
            if (currentOperations.length === 0) {
              reply = `No operations are currently set`
            } else {
              for (var i = 0; i < currentOperations.length; i++) {
                let currentOperationsUpperCase = currentOperations[i].charAt(0).toUpperCase() + currentOperations[i].slice(1)
                reply += `\n${currentOperationsUpperCase}`
              }
            }
            message.channel.send(reply)
          }
        });
        } else if (args.length === 0) {
          let reply = 'Current operations:'
          db.get("currentOperations").then(value => {
            let currentOperations = value
            if (currentOperations.length === 0) {
              reply = `No operations are currently set`
            } else {
              for (var i = 0; i < currentOperations.length; i++) {
                let currentOperationsUpperCase = currentOperations[i].charAt(0).toUpperCase() + currentOperations[i].slice(1)
                reply += `\n${currentOperationsUpperCase}`
              }
            }
            message.channel.send(reply)
          }
        } else {
          message.reply(`You aren't authorized to use this command!`)
        }
      });
      } else {
        message.reply(`You aren't authorized to use this command!`)
      }
    });
  }
}
