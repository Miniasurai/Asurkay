const { Message, Client, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {

  name: "commands",

  aliases: ["command"],

  description: `Help unavailable`,

  userPermissions: [],

  botPermissions: [],

  category: "Help",

  cooldown: 5,

  /**

   *

   * @param {Client} client

   * @param {Message} message

   * @param {String[]} args

   */

  run: async (message, args, client, prefix) => {
    if (args[0] === "all") {
      
      const games = `${client.commands

        .filter((cmd) => cmd.category === `Economy`)

        .sort((a, b) => a.name.localeCompare(b.name))

        .map((cmd) => {

          return `\`${cmd.name}\``;

        })

        .join(", ")}`;

const help = `${client.commands

        .filter((cmd) => cmd.category === `Help`)

        .sort((a, b) => a.name.localeCompare(b.name))

        .map((cmd) => {

          return `\`${cmd.name}\``;

        })

        .join(", ")}`;

const random = `${client.commands

        .filter((cmd) => cmd.category === `Random`)

        .sort((a, b) => a.name.localeCompare(b.name))

        .map((cmd) => {

          return `\`${cmd.name}\``;

        })

        .join(", ")}`;
const owner = `${client.commands

        .filter((cmd) => cmd.category === `Owner`)

        .sort((a, b) => a.name.localeCompare(b.name))

        .map((cmd) => {

          return `\`${cmd.name}\``;

        })

        .join(", ")}`;
const embed = new EmbedBuilder()

.setColor(client.embedColor)  

.setTitle(`🦖 ${client.user.username} Commands`)

.setThumbnail(client.user.avatarURL())

.addFields({ name: "❓ Help", value: help})

.addFields({ name: "💰 Economy", value: games})

.addFields({ name: "⭐ Random", value: random})




if (client.owner.includes(message.author.id)) {

        embed.addFields({ name: `💻 Owner`, value: owner});

}

message.channel.send({embeds: [embed]})
    }
  }
};