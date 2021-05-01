module.exports = {
  name: 'crystals',
  description: `explains crytals and gives you which locations give what mats`,
  usage: `locations | explained`,
  execute(interaction, args, client) {
    if (args[0].name === `locations`) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Raw mat Crystal locations:\nHIP 36601 - C 4 A - Selenium -  (Not crystal shards)\nHIP 36601 - C 1 a - Polonium\nHIP 36601 - C 1 d - Ruthenium\nHIP 36601 - C 3 b - Tellurium\nHIP 36601 - C 5 a - Technetium\n\nOutotz LS-K d8-3 - B 7 b - Ruthenium\nOutotz LS-K d8-3 - B 5 a - Yttrium\nOutotz LS-K d8-3 - B 5 c - Antimony`
          }
        }
      })
    } else {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `Crystalline Forests (aka. Crystals or Forests) are currently the easiest way to get raw mats, their only drawback being the distance you have to travel to make it to them (1.5kLy). All you need is to get there via any method, an SRV, and a DSS. Then you scan your target planet (/crystals locations for their locations), go to a biological signal, and start shooting the crystals and picking them up.`
          }
        }
      })
    }
  }
}
