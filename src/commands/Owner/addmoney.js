const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "addmoney [user] [amount]",
  aliases: ["am"],
  description: `A way to add the amount  of money in your bank or wallet.`,
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
    let amount = a.includes("k", "m") ? convert(a) : a;
        let money = parseInt(amount);
        let result = await cs.addMoney({
            user: user,
guild: {
        id: null
      },
            amount: money,
            wheretoPutMoney: "wallet"
        });
        if (result.error) return message.reply("You cant add negitive money");
        else message.reply({embeds: [new EmbedBuilder()
  .setTitle("Money Added!")
  .setColor(client.embedColor)
  .addFields({ name: "User", value: `<@${user.id}>`})
  .addFields({ name: "Balance Given", value: `${money}`})
  .addFields({ name: "Total Amount", value: `${money}`})
  .setTimestamp()
                                    ]})
    }
};
function convert(string) {
  return string.replace(/k/g, "000")
};

