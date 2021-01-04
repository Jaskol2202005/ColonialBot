module.exports = {
  name: 'crew',
  description: 'gives explanation on how to join the TRCG squadron',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`To join the squadron, go to your right hand panel, click on the squadron button, search **TRCG** in the search bar, and you should find us!`);
  }
}
