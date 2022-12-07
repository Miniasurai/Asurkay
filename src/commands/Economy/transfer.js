const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "transfer",
  aliases: ["give",
    "pay"],
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
    const user = message.mentions.members.first() ||
        client.users.cache.get(args[0]) ||
        message.guild.members.cache.get(args[0]) ||
        message.author;
    if (user.id == message.author.id) return message.channel.send('You can\'t transfer to yourself!');
    if (!user) return message.reply({
      embeds: [
        new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`You don't have enough money in your wallet.`),
      ],
    });
    
    const fetched = await cs.findUser({
        user: message.author,
        guild: { id: null }
    });
    
    let a = args[1];
    if (!args.length) return message.reply("Enter amount of money to add.");
    let amount = a.includes("k") ? convert(a) : a;
    if (a === "all") amount = fetched.wallet;
    
    if (isNaN(amount)) return message.reply(`**${message.author.username}**, Please enter valid number!`);
    if (fetched.wallet < Number(amount)) return message.reply("You don't have enough money to send to the user.");

    if (Number(amount) <= 0) return message.reply("Please provide amount greater than 0"); 

    if (String(amount).includes("-")) return message.reply("You can't use negitive money."); 

    if (String(amount).includes("+")) return message.reply("You can't use negitive money.");

   if (String(amount).includes(".")) return message.reply("You can't use negitive money.");
    var taxval = Math.floor(parseInt(amount) * (10 / 100));
    var withoutTax = parseInt(amount);
var money = Math.floor(parseInt(amount) - taxval);
    

    let result = await cs.addMoney({
      user: user,
      guild: {
        id: null
      },
      amount: money,
      wheretoPutMoney: 'wallet'
    });
    
    let result1 = await cs.removeMoney({
        user: message.author,
        guild: { id: null },
        amount: withoutTax,
        wheretoPutMoney: 'wallet'
    });
    
    message.reply({
      embeds: [
        new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`You have successfully paid ${numeral((money).toLocaleString()).format('0,0')} (${numeral((taxval).toLocaleString()).format('0,0')} fee) to <@${user.id}>`),
      ],
    });
  },
};

function convert(string) {
  return string.replace(/k/g, "000")
};
