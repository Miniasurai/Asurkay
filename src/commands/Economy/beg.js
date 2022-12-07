const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "beg",
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
    let user = message.author;
      //let amount = Math.floor(Math.random() * 1500) + 50;
      let result = await cs.beg({
        user: message.author,
        guild: { id: null },
        minAmount: 500,
        maxAmount: 1000,
        cooldown: 300,
        wheretoPutMoney: "wallet",
      });
      if (result.error) {
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setDescription(
                `You have already worked recently Try again in \`${result.time}\``
              ),
          ],
        });
      }
      else message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${user.username} Got \`${numeral(result.amount).format()}\` from the beg!`)
            .setColor(client.embedColor)
        ],
      }); 
  },
};
