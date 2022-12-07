const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "bank",
  aliases: [""],
  description: `A way to know the amount of money in your bank.`,
  userPermissions: [],
  botPermissions: [],
  category: "Economy",
  cooldown: 5,
  

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (message, args, client, prefix) => {
      let user = message.mentions.members.first() ||
        client.users.cache.get(args[0]) ||
        message.guild.members.cache.get(args[0]) ||
        message.author;

  let result = await cs.balance({
      user: user,
      guild: { id: null},
  });
  message.reply({
    embeds: [
      new EmbedBuilder()
.setThumbnail(user.displayAvatarURL())      
.setColor(client.embedColor)
.setDescription(`${user.username}'s Bank`)
.addFields({ name: `💳 Bank`, value: `\`$${numeral((result.bank).toLocaleString()).format('0,0')} credit(s)\``})
//.setFooter({ text: `${client.user.tag}`, iconURL: client.user.displayAvatarURL()})
    ],
  });
  },
};
