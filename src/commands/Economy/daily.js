const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "daily",
  aliases: [],
  description: `A way to Earn Money!`,
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
    // code
    // message.reply(`Pong`);
    let result = await cs.daily({
      user: message.author,
      guild: { id : null },
      amount: 500,

  });
  if (result.error) message.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`You have used daily recently Try again in ${result.time}`),
    ],
  });
 else message.reply({
    embeds: [
      new EmbedBuilder()
      
        .setColor(client.embedColor)
        .setDescription(`${message.author.username} You have collected your daily ${result.amount * result.rawData.streak.daily} credits (${result.rawData.streak.daily} days streak)!`),
    ],
  });
    if (result.rawData.streak.daily > 1) {
        let money = result.amount || result.rawData.streak.daily;
        await cs.addMoney({
          user: message.author,
          guild: { id: null },
          amount: money,
          wheretoPutMoney: "wallet",
        });
      } else if (result.rawData.streak.daily = 1) {
        await cs.addMoney({
          user: message.author,
          guild: { id: null },
          amount: 500,
          wheretoPutMoney: "wallet",
        });
     } 
  },
};
