const { EmbedBuilder } = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: "work",
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
let result = await cs.work({
user: message.author,
            guild: { id: null},
            maxAmount: 2000,
            replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
            cooldown: 1000 //25 seconds,


  });
  if (result.error) return message.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`You can work again in \`${result.time}\``),
    ],
  });
  else message.reply({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`You worked as a **\`${result.workType}\`** and earned **\`${result.amount} 🪙\`**`)]});
  },
};
