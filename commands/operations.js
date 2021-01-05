const nconf = require('nconf');

nconf.use('file', { file: './ranksVerbose.json' });
nconf.load();

module.exports = {
  name: 'operations',
  description: 'add or remove operations from the database, used to delete opsec breaches',
  usage: 'add|remove|clear <thing you want to censor>',
  args: false,
  execute(message, args) {
    let authorizedUsers = nconf.get(`authorizedUsers`)

    let pos = authorizedUsers.indexOf(message.author.id)

    if (args.length === 0 && pos === -1 && message.channel.id === `781481229693222922` || args.length === 0 && pos === -1 && message.channel.id === `568489134880981002` || args.length === 0 && pos === -1 && message.channel.id === `764097736689451028` || args.length === 0 && pos === -1 && message.channel.id === `569809907709247508` || args.length === 0 && pos === -1 && message.channel.id === `569866296074698793` ) {
      let reply = 'Current operations:'
      let currentOperations = nconf.get(`currentOperations`)
      if (currentOperations.length === 0) {
        reply = `No operations are currently set`
      } else {
        for (var i = 0; i < currentOperations.length; i++) {
          reply += `\n${currentOperations[i]}`
        }
      }
      message.channel.send(reply)
    } else if (pos === -1) {
      message.reply(`You aren't authorized to use this command`)
    } else if (args[0] === `add` && message.channel.id === `781481229693222922` || args[0] === `add` && message.channel.id === `568489134880981002` || args[0] === `add` && message.channel.id === `764097736689451028` || args[0] === `add` && message.channel.id === `569809907709247508` || args[0] === `add` && message.channel.id === `569866296074698793`) {
      args.shift()
      let nextOperation = ''
      for (var i = 0; i < args.length; i++) {
        nextOperation += `${args[i]} `
      }

      let currentOperations = nconf.get(`currentOperations`);

      var edittedOperation = nextOperation.slice(0, -1);

      let pos = currentOperations.indexOf(edittedOperation);

      if (pos > -1) {
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
    } else if (args[0] === `remove` && message.channel.id === `781481229693222922` || args[0] === `remove` && message.channel.id === `568489134880981002` || args[0] === `remove` && message.channel.id === `764097736689451028` || args[0] === `remove` && message.channel.id === `569809907709247508` || args[0] === `remove` && message.channel.id === `569866296074698793`) {
      args.shift()
      let removedOperation = ''
      for (var i = 0; i < args.length; i++) {
        removedOperation += `${args[i]} `
      }

      let currentOperations = nconf.get(`currentOperations`);

      var edittedOperation = removedOperation.slice(0, -1);

      let pos = currentOperations.indexOf(`${edittedOperation}`)

      if (pos === -1) {
        message.channel.send(`Couldn't find this operation in the database`);
        return;
      }

      currentOperations.splice(pos, 1)

      nconf.set(`currentOperations`, currentOperations)
      nconf.save(function (err) {
        if (err) {
          console.error(err.message);
          return;
        }
        message.channel.send('Operation removed successfully.');
      });
    } else if (args.length === 0 && message.channel.id === `781481229693222922` || args.length === 0 && message.channel.id === `568489134880981002` || args.length === 0 && message.channel.id === `764097736689451028` || args.length === 0 && message.channel.id === `569809907709247508` || args.length === 0 && message.channel.id === `569866296074698793`) {
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
    } else {
      message.reply(`You aren't authorized to use this command **here**`)
    }
  }
}
