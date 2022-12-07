// message commands
const { Message } = require("discord.js");

module.exports = {
  name: "kick",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  /**
   *
   * @param {BOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (message, args, client, prefix) => {
  
{

    var coins = [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
];

 let coinz = coins[Math.floor(Math.random() * coins.length)]
        
         let member =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]) ||
          message.author;
        
     
if (!member.user)
          return message.channel.send({
            embeds: [
              new MessageEmbed()
              .setDescription(`${message.author} Text Here!`)
              .setImage(`${coinz}`)
              .setColor(`RED`),
            ],
          });

        const embed = new MessageEmbed()
                .setDescription(`${message.author} Text Here!! ${member.user}`)
                .setImage(`${coinz}`)
                .setColor(`RED`);
                message.channel.send({ embeds: [embed] });
        }
    }
};
