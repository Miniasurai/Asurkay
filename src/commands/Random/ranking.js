// message command aka prefix cmd
const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
// const Discord = require("discord.js");
const numeral = require('numeral');
const cs = new CurrencySystem;

module.exports = {
  name: "ranking",
  aliases: ["lb", "top", "leaderboard"],
  description: `show's Global leaderboard.`,
  userPermissions: [],
  botPermissions: [],
  category: "Random",
  cooldown: 3,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (message, args, client, prefix) => {
if (!args[0]) {
  message.reply({content: "Please select one of the following categories: `money`"})
} else if (args[0].toLowerCase() === "money") {
let data = await cs.globalLeaderboard();
    if (data.length < 1) return message.reply("Nobody's in Global leaderboard yet.");
    const msg = new EmbedBuilder();
    let pos = 0;
        msg.setColor(client.embedColor)
        msg.setTitle(`Leaderboard of Money!`),
    // This is to get First 10 Users )
    data.slice(0, 10).map(e => {
        if (!client.users.cache.get(e.userID)) return;
        pos++
        msg.addFields({ name: `Top #${pos}`, value: `${client.users.cache.get(e.userID).tag} | ${numeral((e.wallet + e.bank).toLocaleString()).format('0,0')}` });
    });

    message.reply({
        embeds: [msg]
    }).catch();
}  
  }
};
function numberFormat(num) {
    let numberFormats = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "K" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "B" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    let i;  
    for (i = numberFormats.length - 1; i > 0; i--) {
        if (num >= numberFormats[i].value) break;
    };
    return (num / numberFormats[i].value).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + numberFormats[i].symbol;
};
