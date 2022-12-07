const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "monthly",
  aliases: [],
  description: `a way to earn money, monthly`,
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
    let result = await cs.monthly({
      user: message.author,
      guild: { id : null },
      amount: 50000,

  });
  if (result.error) { return message.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`You have used monthly recently Try again in ${result.time}`),
    ],
  });
}
  try {
    message.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`You have earned $${result.amount * result.rawData.streak.monthly}. Your streak is now ${result.rawData.streak.monthly}`),
    ],
  });
    if (result.rawData.streak.monthly > 1) {
        // Money gonna be added to the user. according to there streak.
        let money = result.amount * result.rawData.streak.monthly;
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
