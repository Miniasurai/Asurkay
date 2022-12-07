const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "withdraw",
  aliases: ["with"],
  description: `Withdraw your bank money to wallet!`,
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

    const user = await cs.findUser({
      user: message.author,
      guild: {
        id: null
      }
    });

    let a = args[0];
    if (!args.length) return message.reply("Enter the amount you want to withdraw.");
    let amount = a.includes("k") ? convert(a): a;
    if (a === "all") amount = user.bank;
    
    let money = parseInt(amount);

    let result = await cs.withdraw({
      user: message.author,
      guild: {
        id: null
      },
      amount: money
    });

    if (result.error) {
      if (result.type === 'money') return message.reply("Specify an amount to withdraw")
      if (result.type === 'negative-money') return message.reply("You can't withdraw negative money, please use deposit command")
      if (result.type === 'low-money') return message.reply("You don't have that much money in bank.")
      if (result.type === 'no-money') return message.reply("You don't have any money to withdraw")
    } else {
      if (result.type === 'all-success') return message.reply({embeds: [new EmbedBuilder()
.setColor(client.embedColor)
.addFields({ name: `Withdraw`, value: `\`$${result.amount}\``})
.addFields({ name: `Current Wallet Balance`, value: `\`$${result.rawData.wallet}\``})
.addFields({ name: `Current Bank Balance`, value: `\`$${result.rawData.bank}\``})           ]});
      if (result.type === 'success') return message.reply({embeds: [new EmbedBuilder()
.setColor(client.embedColor)
.addFields({ name: `Withdrawn`, value: `\`$${result.amount}\``})
.addFields({ name: `Current Wallet Balance`, value: `\`$${result.rawData.wallet}\``})
.addFields({ name: `Current Bank Balance`, value: `\`$${result.rawData.bank}\``})           ]});

    }
  }
}

function convert(string) {
  return string.replace(/k/g, "000");
}
