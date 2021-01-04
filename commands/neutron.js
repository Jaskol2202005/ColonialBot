module.exports = {
  name: 'neutron',
  description: 'links to winneon/neutron (front-end spansh router)',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`Front-end spansh router at: https://github.com/winneon/neutron`);
  }
}
