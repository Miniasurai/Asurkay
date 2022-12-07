const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "removemoney [user] [amount]",
  aliases: ["removemoney", "rm"],
  description: `A way to remove the amount  of money in your wallet.`,
  userPermissions: [],
  botPermissions: [],
  category: "Owner",
  owner: true,


  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (message, args, client, prefix) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply("Please Mention")
    let a = args[1];
    let amount = a.includes("k") ? convert(a) : a;
        let money = parseInt(amount);
        let result = await cs.removeMoney({
            user: user,
guild: {
        id: null
      },
            amount: money,
            wheretoPutMoney: "wallet"
        });
        if (result.error) return message.reply("You cant add negitive money");
        else message.reply({embeds: [new EmbedBuilder()
  .setTitle("Money Removed!")
  .setColor(client.embedColor)
  .addFields({ name: "User", value: `<@${user.id}>`})
  .addFields({ name: "Balance Remove", value: `${money}`})
  .addFields({ name: "Total Amount", value: `${money}`})
  .setTimestamp()
                                    ]})
    }
};
function convert(string) {
  return string.replace(/k/g, "000")
};

