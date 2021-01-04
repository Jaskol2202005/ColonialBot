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

const prefix = process.env.prefix;

client.once('ready', () => {
  console.log('Authentication successful');
});

client.login(process.env.token);

client.on('message', message => {
  console.log(message.content);
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
  }else {

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

var tick = {
  value: '',
  letMeKnow() {
    console.log(`Tick detected`);
    message.channel.get(`Tick successful`)
  },
  get testVar() {
    return this.value;
  },
  set testVar(value) {
    this.value = value;
    this.letMeKnow();
  }
}

function logEvery5Minutes(i) {
  setTimeout(() => {
    logEvery5Minutes(++i);
  }, 300000)
}

logEvery5Minutes(0)

let i = 0;
setInterval(() => {
  console.log(`tick check`, i++);
  https.get(options, function (res) {
      var json = '';

      res.on('data', function (chunk) {
          json += chunk;
        });

        res.on('end', function () {
          if (res.statusCode === 200) {
              try {
                  var data = JSON.parse(json);
                  console.log(data);
                  let value = data.updated_at
                } catch (e) {
                  console.log('Error parsing JSON!');
                }
              } else {
                console.log('Status:', res.statusCode);
              }
            });
          }).on('error', function (err) {
            console.log('Error:', err);
          });

}, 300000)

https.get(options, function (res) {
    var json = '';

    res.on('data', function (chunk) {
        json += chunk;
      });

      res.on('end', function () {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json);
                console.log(data);
                channel.id(568489134880981002).send(`BGS tick successful`)
              } catch (e) {
                console.log('Error parsing JSON!');
              }
            } else {
              console.log('Status:', res.statusCode);
            }
          });
        }).on('error', function (err) {
          console.log('Error:', err);
        });

const server = https.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
