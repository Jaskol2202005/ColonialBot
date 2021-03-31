const nconf = require('nconf');

prefix = nconf.get(`prefix`)

module.exports = {
  name: 'help',
  description: 'lists all commands and usages',
  usage: '',
  execute(interaction, args, client) {
    const data = [];
    const { commands } = client;

    if (!args) {
      data.push('Here\'s a list of all my commands:');
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: data
          }
        }
      })
    }
    const name = args[0].value.toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
	     return message.reply('that\'s not a valid command!');
     }

     data.push(`**Name:** ${command.name}`);

     if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
     if (command.description) data.push(`**Description:** ${command.description}`);
     if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

     client.api.interactions(interaction.id, interaction.token).callback.post({
       data: {
         type: 4,
         data: {
           content: data
         }
       }
     })
  }
}
