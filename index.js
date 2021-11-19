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

const { Client } = require("discord-slash-commands-client")
const slash = new Client(
  process.env.token,
  "793349157720555570"
)

const Discord = require('discord.js'); //discordjs dependency and collection bootup
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

let Parser = require('rss-parser'); //rss parser for galnet articles (prototype rn)
let parser = new Parser();

db.set("firstTime", true)

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

  if (interaction.member) {
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
  } else {
    if (timestamps.has(interaction.user.id)) {
      if (timestamps.has(interaction.user.id)) {
  	    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
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
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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
  }
});

client.on('message', message => { //recieving regular messages
  console.log(message.content); //logs messages, doesn't have to if you don't want it
  let messageArray = message.content.replace(/[\]\-\^\\\[/!@#$%&*(){}|;:'",.<>?~`=+_]/g, ` `).toLowerCase()
  if (messageArray.includes(`omg it s jaskol`) || messageArray.includes(`omg its jaskol`)) {
    message.delete()
  }
  if (messageArray.includes(`https   coriolis io outfit`)) {
    message.reply(`To minimize clutter and keep things nice and compact, we request that you use coriolis' built in link shortener:\nhttps://imgur.com/a/IpY716u\nhttps://imgur.com/a/LreQVcF`)
    message.delete()
  }
  if (messageArray.includes(`flip a coin`)) {
    function between(min, max) {
      return Math.floor(
        Math.random() * (max - min + 1) + min
      )
    }
    if (between(1, 2) === 1) {
      message.reply(`Heads`)
    } else {
      message.reply(`Tails`)
    }
  }
  db.get("ignoreList").then(value => { //opsec breach detection
    let ignoreList = value
    let pos = ignoreList.indexOf(message.channel.id)
    if (pos === -1) {
      db.get("currentOperations").then(value => {
        let currentOperations = value
        for (var i = 0; i < currentOperations.length; i++) {
          let pos = messageArray.indexOf(currentOperations[i]);
          if (messageArray.includes(currentOperations[i])) {
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
  const embed = {
  "title": "**__Royal Colonial Guard has a Code of Conduct which we expect all of our members to adhere to.__**",
  "color": 1887981,
  "author": {
    "name": "Commander Adama",
    "icon_url": "https://cdn.discordapp.com/avatars/155967206729973760/8943b082cd5de91d924e162f3ae5c34d.png?size=256"
  },
  "fields": [
    {
      "name": "1 - HONOR AND RESPECT:",
      "value": "We are a casual and friendly group, so be respectful of others in game and in Discord.  All members of this server will have their Discord nickname matching their in game CMDR name."
    },
    {
      "name": "Inappropriate posts:",
      "value": "We have members from all areas of the world and all age groups.  We ask that you keep your posts, even in our meme channels to be appropriate for all ages and not offensive to anyone.   Also, we discourage the use of anything that would be considered \"not safe for work\" (NSFW)  if you don't think that your workplace would approve of the material you're about to post.  Please just keep it to yourself or post it somewhere else.",
      "inline": true
    },
    {
      "name": "Inappropriate comments:",
      "value": "We have members of all kinds of religious backgrounds.   All kinds of shapes and colors.  We will not tolerate any kind of racism, bigotry or hate of anyone or any group.  If you can't accept that people may be different from you.  If you can't be accepting of everyone and be kind and respectful to everyone.   Please see your way off this server.   If you don't, we'll do it for you with no warning and no second chances.   This is no tolerance and immediate ban.",
      "inline": true
    },
    {
      "name": "2 - OPEN, PRIVATE GROUP (PG), or SOLO:",
      "value": "While the Guard has no rules dictating the use of Solo and PG game modes, Power Play should be done in OPEN."
    },
    {
      "name": "3 - COMBAT LOGGING:",
      "value": "as described here: https://elite-dangerous.fandom.com/wiki/Combat_Logging, and use of cheats are not allowed."
    },
    {
      "name": "4 - GUESTS FROM OTHER SQUADRONS:",
      "value": "If you are a member of another in-game squadron or group, soliciting current Guard members to change or join other squadrons is prohibited.  You must wear your groups tag in your user name (group tag)"
    },
    {
      "name": "5 - REPRESENTATION:",
      "value": "When you're in our in game Squadron, you are wearing our [TRCG] badge, you are representing the entire group!  We do not gank other players."
    }
  ]
};
  member.send({ embed })
});

client.on('guildMemberRemove', member => { //leaving message + pfp for identification
  client.channels.cache.get(`821961477929959454`).send(`Goodbye **${member.user.username}** :(\nUser's pfp: https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`)
});

client.on(`voiceStateUpdate`, (oldState, newState) => {
  if (newState.channelID === `781458562672230431`) return;
  if (oldState.channelID === null || typeof oldState.channelID == `undefined`) {
    db.get(`${newState.channelID}`).then(value => {
      client.channels.cache.get(value).updateOverwrite(oldState.id, { VIEW_CHANNEL: true })
    })
  } else if (newState.channelID === null || typeof newState.channelID == `undefined`) {
    db.get(`${oldState.channelID}`).then(value => {
      client.channels.cache.get(value).permissionOverwrites.get(oldState.id).delete();
    })
  } else if (oldState.channelID !== newState.channelID) {
    db.get(`${oldState.channelID}`).then(value => {
      let oldLink = value
      db.get(`${newState.channelID}`).then(value => {
        let newLink = value
        client.channels.cache.get(oldLink).permissionOverwrites.get(oldState.id).delete();
        client.channels.cache.get(newLink).updateOverwrite(oldState.id, { VIEW_CHANNEL: true })
      })
    })
  }
})

function makeChannel(message){
  var server = message.guild;
  var name = message.author.username;

  server.createChannel(name, "text");
}

client.on(`voiceStateUpdate`, (oldState, newState) => {
  console.log(oldState);
  console.log(`------------------------------------------------------------------------------------------`);
  console.log(newState);
  if (newState.channelID === `781458562672230431`) return;
  if (newState.channelID === `567685575197458436`) {
    oldState.guild.createChannel(`new-public`, {
      type: `GUILD_VOICE`,
      permissionOverwrites: [
        {
          id: `567746245637046272`,
          allow: [Permissions.FLAGS.VIEW_CHANNEL]
        },
        {
          id: `572424557772668959`,
          allow: [Permissions.FLAGS.VIEW_CHANNEL]
        },
        {
          id: `764092358136430602`,
          allow: [Permissions.FLAGS.VIEW_CHANNEL]
        },
        {
          id: oldState.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL]
        }
      ]
    })

  }
})

var options = { //bgs tick detection
  host: 'elitebgs.app',
  path: `/api/ebgs/v5/ticks`,
  headers: {
    'Accept': 'application/json'
  }
};

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
          db.get("lastTick").then(value => {
            var data = JSON.parse(json);
            let currentTick = moment(data[0].time).toISOString()
            let lastTick = moment(value).toISOString()
            let currentDate = moment().toISOString()
            let inTwentySeven = moment(value).add(27, `hour`).toISOString()
            let inTwentyEight = moment(value).add(28, `hour`).toISOString()
            console.log(data[0].time);
            db.get("deductionTick").then(value => {
              let deductionTick = moment(value).toISOString()
              db.get("firstTime").then(value => {
                let firstTime = value
                if (firstTime) {
                  db.set("lastTick", currentTick)
                  db.set("firstTime", false)
                } else if (inTwentySeven < currentDate && currentDate < inTwentyEight) {
                  client.channels.cache.get(`568524008165998603`).send(`Tick successfully completed on **<t:${moment().unix()}:f>** (Tick completed by deduction, 27 hours since last)`)
                  client.channels.cache.get(`800816235574067230`).messages.fetch({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first()
                    if (!lastMessage.authot.bot) {
                      client.channels.cache.get(`800816235574067230`).send(`---------tick (by deduction)----------`)
                    }
                  })
                  client.channels.cache.get(`829207812005429268`).messages.fetch({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first()
                    if (!lastMessage.authot.bot) {
                      client.channels.cache.get(`829207812005429268`).send(`---------tick (by deduction)----------`)
                    }
                  })
                  db.set("lastTick", currentDate)
                  db.set("deductionTick", currentDate)
                } else if (lastTick !== currentTick && lastTick !== deductionTick) {
                  client.channels.cache.get(`568524008165998603`).send(`Tick successfully completed on **<t:${moment(data[0].time).unix()}:f>**, <t:${moment(data[0].time).unix()}:R>`)
                  client.channels.cache.get(`800816235574067230`).messages.fetch({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first()
                    if (!lastMessage.author.bot) {
                      client.channels.cache.get(`800816235574067230`).send(`---------tick----------`)
                    }
                  })
                  client.channels.cache.get(`829207812005429268`).messages.fetch({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first()
                    if (!lastMessage.author.bot) {
                      client.channels.cache.get(`829207812005429268`).send(`---------tick----------`)
                    }
                  })
                  db.set("lastTick", currentTick)
                }
              })
            })
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
  let currentDay = moment.tz('America/Edmonton').format('dddd') //powerplay tick detection
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

const http = require('http'); //a ping exploit to keep it running on replit
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
