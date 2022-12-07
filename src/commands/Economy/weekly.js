const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "weekly",
  aliases: [],
  description: `a way to earn money, weekly`,
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
    let result = await cs.weekly({
      user: message.author,
      guild: { id : null },
      amount: 5000,

  });
  if (result.error) { return message.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`You have used weekly recently Try again in ${result.time}`),
    ],
  });
}
  try {
    message.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`You have earned $${result.amount * result.rawData.streak.weekly}. Your streak is now ${result.rawData.streak.weekly}`),
    ],
  });
    if (result.rawData.streak.weekly > 1) {
        // Money gonna be added to the user. according to there streak.
        let money = result.amount * result.rawData.streak.weekly;
        let r = await cs.addMoney({
          user: message.author,
          guild: { id: null },
          amount: money,
          wheretoPutMoney: "wallet",
        });
      } else if (result.rawData.streak.weekly = 1) {
        // Money gonna be added to the user. according to there streak.
        await cs.addMoney({
          user: message.author,
          guild: { id: null },
          amount: 5000,
          wheretoPutMoney: "wallet",
        });
      }
  } catch (error) {
      client.logger.log(error, "error");
  }
  },
};
