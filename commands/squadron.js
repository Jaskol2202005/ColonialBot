module.exports = {
  name: 'squadron',
  description: 'gives explanation on how to join the TRCG squadron + a link to the inara squadron',
  usage: '',
  args: false,
  execute(message, args) {
    message.channel.send(`To join the squadron, go to your right hand panel, click on the squadron button, search **TRCG** in the search bar, and you should find us!\n\nAfter you've joined in-game, you are also free to join our inara squadron!\nhttps://inara.cz/squadron/9718/`);
  }
}