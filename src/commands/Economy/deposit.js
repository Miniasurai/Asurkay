const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "deposit",
  aliases: ["dep"],
  description: `Deposit your wallet money to bank!`,
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
      guild: { id: null }
    });

    let a = args[0];
    if (!args.length) return message.reply("Enter the amount you want to deposit.");
    let amount = a.includes("k") ? convert(a) : a;
    if (a === "all") amount = user.wallet;
    let money = parseInt(amount);

    let result = await cs.deposite({
      user: message.author,
      guild: {
        id: null
      },
      amount: money
    });

    if (result.error) {
      if (result.type === 'money') return message.reply("Specify an amount to deposit");
      if (result.type === 'negative-money') return message.reply("You can't deposit negative money");
      if (result.type === 'low-money') return message.reply("You don't have that much money in wallet.");
      if (result.type === 'no-money') return message.reply("You don't have any money to deposit");
    } else {
      let oldMoney = 0;
        if (money == "all") {
          let user = await cs.balance({
            user: message.author,
            guild: null,
          });
          oldMoney = user.wallet;
        }
      if (result.type === 'all-success') return message.reply({embeds: [new EmbedBuilder()
.setColor(client.embedColor)
.addFields({ name: `Deposited`, value: `\`$${result.oldMoney}\``})
.addFields({ name: `Current Wallet Balance`, value: `\`$${result.rawData.wallet}\``})
.addFields({ name: `Current Bank Balance`, value: `\`$${result.rawData.bank}\``})           ]});                                                            
      if (result.type === 'success') return message.reply({embeds: [new EmbedBuilder()
.setColor(client.embedColor)
.addFields({ name: `Deposited`, value: `\`$${result.amount}\``})
.addFields({ name: `Current Wallet Balance`, value: `\`$${result.rawData.wallet}\``})
.addFields({ name: `Current Bank Balance`, value: `\`$${result.rawData.bank}\``})           ]});
    };
  }
}

function convert(string) {
  return string.replace(/k/g, "000")
  return string.replace(/m/g, "000000")
  return string.replace(/b/g, "000000000");
}
