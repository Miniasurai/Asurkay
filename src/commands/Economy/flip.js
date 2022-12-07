const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "flip [amount] [head/tail]",
  aliases: ["coinflip", "cf", "flip"],
  description: `Make a coin flip and test your luck and win money.`,
  userPermissions: [],
  botPermissions: [],
  category: "Economy",
  cooldown: 3,
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (message, args, client, prefix) => {
    //let user = interaction.options.findUser("user");
    const user = await cs.findUser({
        user: message.author,
        guild: { id: null }
    });
    
    let a = args[0];
    if (!args.length) return message.reply("Enter amount of money to bet.");
    let amount = a.includes("k", "m") ? convert(a) : a;
    if (a === "all") amount = user.wallet;
    
    if (isNaN(amount)) return message.reply(`**${message.author.username}**, Please enter valid number!`);
    if (user.wallet < Number(amount)) return message.reply("You don't have enough money to bet.");
    if (Number(amount) <= 0) return message.reply("Please provide amount greater than 0"); 
    if (String(amount).includes("-")) return message.reply("You can't use negitive money."); 
    if (String(amount).includes("+")) return message.reply("You can't use negitive money.");
   if (String(amount).includes(".")) return message.reply("You can't use negitive money.");
    let money = parseInt(amount);

    if (args[1] != undefined) {
      var flip = args[1] ? args[1].toLowerCase() : false //Heads or Tails
if (!flip || !['heads', 'tails', 'head', 'tail', 'h', 't'].includes(flip)) 
        return message.reply("Please select heads or tails.");
      let choice = args[1].toLowerCase();


      console.log(`choice : ${choice}`);
      if (choice == 'HEADS' || choice == 'H' || choice == 'HEAD') {
        choice = 'HEADS';
      } else if (choice == 'TAILS' || choice == 'T' || choice == 'TAIL') {
        choice = 'TAILS';
      }
      if (choice == 'heads' || choice == 'h' || choice == 'head') {
        choice = 'heads';
      } else if (choice == 'tails' || choice == 't' || choice == 'tail') {
        choice = 'tails';
      }
      if (choice == 'h' || choice == 'head') {
        choice = 'head';
      } else if (choice == 't' || choice == 'tail') {
        choice = 'tail';
      }


      var coins = [
        "heads",
        "tails",
      ];
      var valid_Numbers = ['heads', 'tails'];
      var co = valid_Numbers[Math.floor((Math.random() * valid_Numbers.length))]
      let win = false;
      if(choice == co) win = true;
      let coinz = coins[Math.round(Math.random() * coins.length)]//nz.length)];2, 3, 4, 2)]

      if (win) {
            let result = await cs.addMoney({
                user: message.author,
                guild: { id: null},
                amount: money,
            });
         message.reply({embeds: [new EmbedBuilder()
 .setColor(client.embedColor)                                  .setTitle("✅ You win")
.setDescription(`The Coin Flipped: \`${co}\`\n\n👛 You have \`$${result.rawData.wallet}\``)
.setFooter({ text: `${message.author.tag}`, value: client.user.displayAvatarURL()})                                   ]});   
      } else {
            let result = await cs.removeMoney({
                user: message.author,
                guild: { id: null},
                amount: money,
            });
            message.reply({embeds: [new EmbedBuilder()
 .setColor(client.embedColor)                                  .setTitle("❎ You lose")
.setDescription(`The Coin Flipped: \`${co}\`\n\n👛 You have \`$${result.rawData.wallet}\``)
.setFooter({ text: `${message.author.tag}`, value: client.user.displayAvatarURL()})                                   ]});
      };
    } else {
      message.reply("please choose *heads* or *tails* before the coin flip.");
    }
  }
}

function convert(string) {
  return string.replace(/k/g, "000")
};
