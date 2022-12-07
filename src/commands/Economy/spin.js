const {
  EmbedBuilder
} = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const numeral = require('numeral');
module.exports = {
  name: "spin",
  aliases: [],
  description: `Take a chance of your luck in spinning the wheel`,
  userPermissions: [],
  botPermissions: [],
  category: "Economy",
  cooldown: 300,
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (message, args, client, prefix) => {
    const money = Math.floor(Math.random() * (1000 - 50) + 50);

    let result = await cs.addMoney({
      user: message.author,
      guild: { id: null},
      amount: money,
    });

    const embed = new EmbedBuilder()
    .setColor(client.embedColor)
    .setDescription(`${message.author.username} is spinning the wheel of fortune...`)
    .setImage("https://images-ext-2.discordapp.net/external/HsKDQ0E_aFmmt_y1C0MGjAtkkHEtJqvSgVVC6BEpcBI/https/cdn.zerotwo.dev/INTERNAL/WOF.gif")

    return message.channel.send({
      embeds: [embed]
    }).then((msg) => {
          setTimeout(() => {
      let editEm = new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription(`${message.author.username} has won ${money} credits from the wheel of fortune!`)
      .setImage("https://media.discordapp.net/attachments/986907645602590760/992280929835941929/Counting-Money.gif")
      msg.edit({
        embeds: [editEm]
      });
    }, 5000)
    });
  }
}
