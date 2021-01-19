const nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();

module.exports = {
  name: 'operations',
  description: 'add or remove operations from the database, used to delete opsec breaches',
  usage: 'add|remove|clear <thing you want to censor>',
  args: false,
  execute(message, args) {
    let ignoreList = nconf.get(`ignoreList`)

    let pos9000 = ignoreList.indexOf(message.channel.id)
    if (pos9000 !== -1) {
      let authorizedUsers = nconf.get(`authorizedUsers`)

      let position = authorizedUsers.indexOf(message.author.id)
      if (position !== -1) {
        if (args[0] === `add`) {
          args.shift()
          let nextOperation = ''
          for (var i = 0; i < args.length; i++) {
            nextOperation += `${args[i]} `
          }

          let currentOperations = nconf.get(`currentOperations`);

          var edittedOperation = nextOperation.slice(0, -1);

          let pos1 = currentOperations.indexOf(edittedOperation);

          if (pos1 > -1) {
            message.channel.send(`This operation is already in the database`)
            return;
          }

          let newOperations = currentOperations.push(edittedOperation)

          nconf.set(`currentOperations`, currentOperations)

          nconf.save(function (err) {
            if (err) {
              console.error(err.message);
              return;
            }
            message.channel.send('Operation added successfully.');
          });
        } else if (args[0] === `remove`) {
          args.shift()
          let removedOperation = ''
          for (var i = 0; i < args.length; i++) {
            removedOperation += `${args[i]} `
          }

          let currentOperations = nconf.get(`currentOperations`);

          var edittedOperation = removedOperation.slice(0, -1);

          let pos1 = currentOperations.indexOf(`${edittedOperation}`)

          if (pos1 === -1) {
            message.channel.send(`Couldn't find this operation in the database`);
            return;
          }

          currentOperations.splice(pos1, 1)

          nconf.set(`currentOperations`, currentOperations)
          nconf.save(function (err) {
            if (err) {
              console.error(err.message);
              return;
            }
            message.channel.send('Operation removed successfully.');
          });
        } else if (args[0] === `clear`) {
          let currentOperations = nconf.get(`currentOperations`)
          if (currentOperations.length === 0) {
            message.reply(`Database is already empty!`)
          } else {
            let clear = []
            nconf.set(`currentOperations`, clear)
            nconf.save(function (err) {
              if (err) {
                console.error(err.message);
                return;
              }
              message.channel.send('Operations cleared successfully.');
            });
          }
        } else if (args.length === 0) {
          let reply = 'Current operations:'
          let currentOperations = nconf.get(`currentOperations`)
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
      } else if (args.length === 0) {
        let reply = 'Current operations:'
        let currentOperations = nconf.get(`currentOperations`)
        if (currentOperations.length === 0) {
          reply = `No operations are currently set`
        } else {
          for (var i = 0; i < currentOperations.length; i++) {
            let currentOperationsUpperCase = currentOperations[i].charAt(0).toUpperCase() + currentOperations[i].slice(1)
            reply += `\n${currentOperationsUpperCase}`
          }
        }
        message.channel.send(reply)
      } else {
        message.reply(`You aren't authorized to use this command!`)
      }
    } else {
      message.reply(`You aren't authorized to use this command!`)
    }
  }
}
