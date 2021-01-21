console.log('Welcome to TRCG Bot');
console.log('Authenticating...');

var https = require('https');
const fs = require('fs');
var nconf = require('nconf');
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = nconf.get(`prefix`);

client.once('ready', () => {
  console.log('Authentication successful');
});

client.login(process.env.token);

client.on('message', message => {
  console.log(message.content);
  let ignoreList = nconf.get(`ignoreList`)
  let currentOperations = nconf.get(`currentOperations`)
  for (var i = 0; i < currentOperations.length; i++) {
    let currentOperationsUpperCase = currentOperations[i].charAt(0).toUpperCase() + currentOperations[i].slice(1)
    let pos = ignoreList.indexOf(message.channel.id)
    if (pos !== -1) {

    } else if (message.content.includes(currentOperations[i]) || message.content.includes(currentOperationsUpperCase)) {
      message.reply(`Opsec breach detected, message deleted.\n\nMake sure to censor opsec data next time!\nex. [REDACTED]`)
      message.delete()
    }
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${commandName} ${command.usage}\``;
    }
    message.channel.send(reply)
  } else {

    try {
      command.execute(message, args)
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  }
})


var options = {
  host: 'elitebgs.app',
  path: `/api/ebgs/v5/ticks`,
  headers: {
    'Accept': 'application/json'
  }
};

x = {
  aInternal: 10,
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}

let i = 0;
setInterval(() => {
  console.log(`tick check`, i++);
  https.get(options, function(res) {
    var json = '';

    res.on('data', function(chunk) {
      json += chunk;
    });

    res.on('end', function() {
      if (res.statusCode === 200) {
        try {
          var data = JSON.parse(json);
          console.log(data[0].time);
          if (x.a === data[0].time) {
          } else {
            x.a = data[0].time
          }
        } catch (e) {
          console.log('Error parsing JSON!');
        }
      } else {
        console.log('Status:', res.statusCode);
      }
    });
  }).on('error', function(err) {
    console.log('Error:', err);
  });

}, 60000)

https.get(options, function(res) {
  var json = '';

  res.on('data', function(chunk) {
    json += chunk;
  });

  res.on('end', function() {
    if (res.statusCode === 200) {
      try {
        var data = JSON.parse(json);
        console.log(data[0].time);
        x.a = data[0].time
      } catch (e) {
        console.log('Error parsing JSON!');
      }
    } else {
      console.log('Status:', res.statusCode);
    }
  });
}).on('error', function(err) {
  console.log('Error:', err);
});

x.registerListener(function(val) {
  console.log("x.a has been changed to " + val);
  let lastTick = nconf.get(`lastTick`)
  if (lastTick === val) {
    return;
  } else {
    date = new Date(x.a);
    let minutes = date.getUTCMinutes()
    nconf.set(`lastTick`, x.a)
    nconf.save(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
    if (date.getUTCMinutes() < 10) {
      utcMinutes = `0${date.getUTCMinutes()}`
    } else {
      utcMinutes = date.getUTCMinutes()
    }
    client.channels.cache.get(`715038247964639282`).send(`Tick successfully completed at **${date.getUTCHours()}:${utcMinutes} UTC**`)
    client.channels.cache.get(`708839430307184756`).send(`---------tick----------`)
  }
});

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
