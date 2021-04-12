//Welcome text in console
console.log('Welcome to TRCG Bot');
console.log('Authenticating...');

//dependencies
const Database = require("@replit/database"); //Since I use replit for hosting, I use their database as well
const db = new Database();

var https = require('https') //general dependencies
var nconf = require('nconf');
const fs = require('fs');
require('dotenv').config();

const moment = require('moment-timezone'); //moment for powerplay tick reminders

const Discord = require('discord.js'); //discordjs dependency and collection bootup
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

let Parser = require('rss-parser'); //rss parser for galnet articles (prototype rn)
let parser = new Parser();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //loads directory for commands

for (const file of commandFiles) { //loads commands
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = nconf.get(`prefix`); //gets prefix from database

client.once('ready', () => { //console text and status set
  console.log('Authentication successful');
  client.user.setActivity('feds die', { type: "LISTENING" })
});

client.login(process.env.token); //discord token login, happens before .once('ready')

client.ws.on('INTERACTION_CREATE', async interaction => { //recieving commands
  console.log(interaction); //currently logs it, doesn't need to if you don't want it

  const commandName = interaction.data.name.toLowerCase(); //sets variables
  const args = interaction.data.options
  const command = client.commands.get(commandName);

  const { cooldowns } = client; //cooldown stuff

  if (!cooldowns.has(command.name)) {
	   cooldowns.set(command.name, new Discord.Collection());
   }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(interaction.member.user.id)) {
    if (timestamps.has(interaction.member.user.id)) {
	    const expirationTime = timestamps.get(interaction.member.user.id) + cooldownAmount;
	    if (now < expirationTime) {
		    const timeLeft = (expirationTime - now) / 1000;
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
            }
          }
        })
        return
	    }
    }
  }
  timestamps.set(interaction.member.user.id, now);
  setTimeout(() => timestamps.delete(interaction.member.user.id), cooldownAmount);

  try { //executes the command
    command.execute(interaction, args, client);
  } catch (error) {
    console.error(error);
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "An error occured trying to execute this command"
        }
      }
    })
  }
});

client.on('message', message => { //recieving regular messages
  console.log(message.content); //logs messages, doesn't have to if you don't want it
  db.get("ignoreList").then(value => { //opsec breach detection
    let ignoreList = value
    let pos = ignoreList.indexOf(message.channel.id)
    if (pos === -1) {
      db.get("currentOperations").then(value => {
        let currentOperations = value
        let messageArray = message.content.replace(/[\]\-\^\\\[/!@#$%&*(){}|;:'",.<>?~`=+_]/g, ` `).toLowerCase().split(/ +/)
        for (var i = 0; i < currentOperations.length; i++) {
          let pos = messageArray.indexOf(currentOperations[i]);
          if (pos !== -1) {
            message.reply(`Opsec breach detected, message deleted.\n\nMake sure to censor opsec data next time!\nex. [REDACTED]`)
            message.delete()
            return;
          }
        }
      });
    }
  });
  if (!message.content.startsWith(prefix) || message.author.bot) return //normal command deprection notice

  const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  message.reply(`non-interaction commands are now depreciated with this bot, please use the / command method through the popup window`)
})

client.on('guildMemberAdd', member => { //welcome message
  client.channels.cache.get(`567685575197458434`).send(`Hello <@!${member.id}>, welcome to **The Royal Colonial Guard** :tada::hugging: !! I will be with you shortly.  In the mean time, please read and agree to the rules they're in the pinned message!  Top right of your screen :pushpin:  You were also sent a dm from our welcome bot with the rules!  I need you to verify your Cmdr name.  You can also tell me a little about yourself and what you like to do in game!\n\n<@&572424557772668959>\n<@&567746245637046272>`)
  member.send(`Royal Colonial Guard has a Code of Conduct which we expect all of our members to adhere to.\n\n1 - HONOR AND RESPECT:\nWe are a casual and friendly group, so be respectful of others in game and in Discord.  All members of this server will have their Discord nickname matching their in game CMDR name.\n\n2 - OPEN, PRIVATE GROUP (PG), or SOLO:\nWhile the Guard has no rules dictating the use of Solo and PG game modes, Power Play should be done in OPEN.\n\n3 - COMBAT LOGGING:\nCombat logging as described here: https://elite-dangerous.fandom.com/wiki/Combat_Logging, and use of cheats are not allowed.\n\n4 - GUESTS FROM OTHER SQUADRONS:\nIf you are a member of another in-game squadron or group, soliciting current Guard members to change or join other squadrons is prohibited.\n\n5 - BACKGROUND SIMULATION (BGS):\nWhile there is no obligation to contribute, concentrated work against our PMF is not allowed. This includes killing clean Aisling's Guardian NPCs.  If you are unsure on how your actions may affect our efforts please ask in the appropriate channels.\n\nWhen you're in our in game Squadron, you are wearing our [TRCG] badge, you are representing the entire group!  We do not gank other players.  If we engage, it is strictly on a powerplay and BGS basis.`)
});
client.on('guildMemberRemove', member => { //leaving message + pfp for identification
  client.channels.cache.get(`821961477929959454`).send(`Goodbye **${member.user.username}** :(\nUser's pfp: https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`)
});

var options = { //bgs tick detection
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

let i = 1
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
          let lastTick = moment(x.a)
          let currentDate = moment().format()
          let inTwentyFive = lastTick.add(25, `hour`)
          var data = JSON.parse(json);
          console.log(data[0].time);
          db.get("nowTime").then(value => {
            let nowTime = value
            if (inTwentyFive.isBefore(currentDate)) {
              x.a = currentDate
              db.set("nowTime", currentDate)
            } else if (x.a === data[0].time) {
            } else if (x.a === nowTime) {
            } else {
              x.a = data[0].time
            }
          })
        } catch (e) {
          console.log('Error parsing JSON!');
        }
      } else {
        console.log('Status:', res.statusCode);
      }
    });
  }).on('error', function(err) {
    console.log('Error:', err);
    db.get("errorStatus").then(value => {
      if (value === 1) {
        return;
      } else {
        db.set("errorStatus", 1).then(() => {});
        client.channels.cache.get(`715038247964639282`).send(`Error Encountered, Error code: ${err}`)
      }
    });
  });
  let currentDay = moment.tz('America/Los_Angeles').format('dddd') //powerplay tick detection
  db.get("powerplayReminder").then( value => {
    let powerplayReminder = value
    if (currentDay === `Wednesday` && powerplayReminder === `not said`) {
      client.channels.cache.get(`764097736689451028`).send(`Reminder that today is the last day to get your merits before the powerplay tick!`)
      db.set("powerplayReminder", `said`).then(() => {})
    } else if (currentDay === `Thursday` && powerplayReminder === `said`) {
      client.channels.cache.get(`764097736689451028`).send(`The powerplay tick should now be in progress! The galaxy will be offline for aprox. 15 mins, enjoy your prismatics when it comes back online!`)
      db.set("powerplayReminder", `not said`).then(() => {})
    }
  });
}, 60000)

https.get(options, function(res) {
  var json = '';

  res.on('data', function(chunk) {
    json += chunk;
  });

  res.on('end', function() {
    if (res.statusCode === 200) {
      db.set("errorStatus", 0).then(() => {});
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
  db.get("errorStatus").then(value => {
    if (value === 1) {
      return;
    } else {
      db.set("errorStatus", 1).then(() => {});
      client.channels.cache.get(`715038247964639282`).send(`Error Encountered, Error code: ${err}`)
    }
  });
});

x.registerListener(function(val) {
  console.log("x.a has been changed to " + val);
  db.get("lastTick").then(value => {
    if (value === val) {
    return;
    } else {
    date = new Date(x.a);
    let minutes = date.getUTCMinutes()
    db.set("lastTick", x.a).then(() => {});
    if (date.getUTCMinutes() < 10) {
      utcMinutes = `0${date.getUTCMinutes()}`
    } else {
      utcMinutes = date.getUTCMinutes()
    }
    client.channels.cache.get(`568524008165998603`).send(`Tick successfully completed at **${date.getUTCHours()}:${utcMinutes} UTC**`)
    client.channels.cache.get(`800816235574067230`).send(`---------tick----------`)
    client.channels.cache.get(`829207812005429268`).send(`---------tick----------`)
  }
  });
});

  (async () => { //rss feed (prototype, doesn't work, yet)
    let feed = await parser.parseURL('https://community.elitedangerous.com/en/galnet-rss');
    feed.items.pop(1)
    feed = feed.items
    let content = []
    for (var i = 0; i < feed.length; i++) {
      content.push(feed[i].contentSnippet)
    }
    db.set("feeded", content)
    db.get("feeded").then(value => {
      let feeded = value
      console.log(feeded);
    })
  })();

const http = require('http'); //a ping exploit to keep it running on replit
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
