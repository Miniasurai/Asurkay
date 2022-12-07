const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "slots [amount]",
  aliases: ["slots", "slot"],
  description: `Make a slots and test your luck and win money.`,
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
    const slotItems = ["🍅", "🥑", "🥒", "🍆", "🥝", "🍇", "🍉", "🍊", "🍏", "💣", "🍓", "🍎", "🍒", "🍈", "🍋", "🍌"];
    const user = await cs.findUser({
        user: message.author,
        guild: { id: null }
    });
    
    let a = args[0];
    if (!args.length) return message.reply("Enter amount of money to bet.");
    let amount = a.includes("k") ? convert(a) : a;
    if (a === "all") amount = user.wallet;
    
    if (isNaN(amount)) return message.reply(`**${message.author.username}**, Please enter valid number!`);
    if (user.wallet < Number(amount)) return message.reply("You don't have enough money to bet.");
    if (Number(amount) <= 0) return message.reply("Please provide amount greater than 0"); 
    if (String(amount).includes("-")) return message.reply("You can't use negitive money."); 
    if (String(amount).includes("+")) return message.reply("You can't use negitive money.");
   if (String(amount).includes(".")) return message.reply("You can't use negitive money.");
    let money = parseInt(amount);
    let win = false;
let number = []
      for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
  
      if (number[0] == number[1] && number[1] == number[2]) { 
          money *= 2
          win = true;
      } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
          money *= 2
          win = true;
}
    
if (win) {

let result = await cs.addMoney({
                user: message.author,
                guild: { id: null},
                amount: money,
            });
  const embed = new EmbedBuilder()
.setColor(client.embedColor)  .setThumbnail("https://cdn.discordapp.com/attachments/980026295515758602/994827034243108915/Slot-Machine-Jackpot-with-Real-Money-Prizes.gif")
.addFields({ name: `✅ **You Win 2x coins!**`, value: ` ${slotItems[number[0]]} | ${slotItems[number[2]]} | ${slotItems[number[1]]}\n${slotItems[number[1]]} | ${slotItems[number[2]]} | ${slotItems[number[0]]} <\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}`})
.setFooter({ text: `Your new balance is: ${numeral((result.rawData.wallet).toLocaleString()).format('0,0')}` })
  message.reply({embeds: [embed]})
} else {
  let result = await cs.removeMoney({
                user: message.author,
                guild: { id: null},
                amount: money,
            });
    const embed1 = new EmbedBuilder()
.setColor(client.embedColor)
  .setThumbnail("https://cdn.discordapp.com/attachments/980026295515758602/994827034243108915/Slot-Machine-Jackpot-with-Real-Money-Prizes.gif")
.addFields({ name: `❎ **You lose**`, value:` ${slotItems[number[0]]} | ${slotItems[number[2]]} | ${slotItems[number[1]]}\n${slotItems[number[1]]} | ${slotItems[number[2]]} | ${slotItems[number[0]]} <\n${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}`})
.setFooter({ text: `Your new balance is: ${numeral((result.rawData.wallet).toLocaleString()).format('0,0')}` })
  message.reply({embeds: [embed1]})
}
}
}
function convert(string) {
  return string.replace(/k/g, "000")
};
