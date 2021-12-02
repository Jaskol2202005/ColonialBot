module.exports = {
  name: 'google',
  description: 'explains how to effectively use the search engine "Google" to find anything that one desires',
  usage: ``,
  execute(interaction, args, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Google is a modern search engine that has many uses which include but are not limited to, finding information that one does not posses in the moment. To effectively utilise this modern marvel of engineering, one must follow only a few simple steps:\n\n1: Open an internet brower of your choice\n2: Enter in the search bar \"google.com\"\n3: Enter a query on the topic you wish to know more about\n\nIf it is the first time you're using this tool, consider following this [link](https://google.com) for easier access to it, you can even utilise the function most browser come with to \"bookmark\" the site, and return to it whenever one wants to."
        }
      }
    })
  }
}
