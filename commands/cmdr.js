const https = require('https');
const nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();

module.exports = {
  name: 'cmdr',
  description: 'looks up a commander on inara.cz',
  usage: '<commander name>',
  args: true,
  execute(message, args) {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let reply = ''
    var currentTime = new Date();
    let commanderName = `${args[0]}`
    args.shift()
    for (var i = 0; i < args.length; i++) {
      commanderName += ` ${args[i]}`
    }
    axios.post('https://inara.cz/inapi/v1/', {
      header: {
        appName: 'TRCGbot',
        appVersion: `0.1.0`,
        isDeveloped: `true`,
        APIkey: `28r9agl7t5a8gw880cc0wgcowc84k8k0kgsc4k`
      },
      events: [
        {
          eventName: `getCommanderProfile`,
          eventTimestamp: `${currentTime.toISOString()}`,
          eventData: {
            searchName: `${commanderName}`
          }
        }
      ]
    })
    .then(function (response) {

      if (response.data.events[0].eventStatus === 200 | response.data.events[0].eventStatus === 202) {
        let data = response.data
        let eventData = data.events[0].eventData
        let commanderRanksPilot = response.data.events[0].eventData.commanderRanksPilot

        console.log(eventData);

        commanderRanksPilot.splice(3, 1)
        reply += `CMDR ${eventData.userName}\n\n`
        for (var i = 0; i < commanderRanksPilot.length; i++) {
          let rank = nconf.get(`ranks:${commanderRanksPilot[i].rankName}:${commanderRanksPilot[i].rankValue}`)
          reply += `**${capitalizeFirstLetter(commanderRanksPilot[i].rankName)}**: ${rank} - ${Math.trunc(commanderRanksPilot[i].rankProgress * 100)}%\n`
        }
        reply += `\nPreferred allegiance: ${eventData.preferredAllegianceName}`
        if (eventData.preferredPowerName) {
          reply += `\nCurrent pledged power: ${eventData.preferredPowerName}`
        } else {
          reply += `\nNot currently pledged`
        }
        if (eventData.preferredGameRole) {
          reply += `\nPreferred game role: ${eventData.preferredGameRole}`
        } else {
          reply += `\nNo preferred game role found`
        }

        reply += `\nCMDR Inara link: ${eventData.inaraURL}`

        if (eventData.commanderSquadron) {
          reply += `\n\nCurrent squadron: **${eventData.commanderSquadron.squadronName}**\nSquadron members: **${eventData.commanderSquadron.squadronMembersCount}**\nSquadron rank: **${eventData.commanderSquadron.squadronMemberRank}**\nInara link: ${eventData.commanderSquadron.inaraURL}`
        } else {
          reply += `\n\nCMDR is not part of an Inara squadron`
        }

        if (eventData.otherNamesFound) {
          let otherNames = eventData.otherNamesFound
          reply += `\n\nOther possible CMDR names:\n`
          for (var i = 0; i < otherNames.length; i++) {
            reply += `${otherNames[i]}, `
          }
        }

        message.channel.send(reply)
      } else if (response.data.events[0].eventStatus === 204) {
        message.channel.send(`No inara profiles were found`)
      } else if (response.data.events[0].eventStatus === 400) {
        message.channel.send(`There was an error executing that command`)
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
