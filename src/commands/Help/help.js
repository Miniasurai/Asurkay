const { Message, Client, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "help [commands]",
  aliases: ["help"],
  description: `View all Help based commands`,
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

    
if (args[0]) {
  
          const embed = new EmbedBuilder();
        const cmd = client.mcommands.get(args[0].toLowerCase()) || client.mcommands.get(client.aliases.get(args[0].toLowerCase()))
  
          if (!cmd) {
              return message.channel.send({embeds: [embed.setColor(client.embedColor).setTitle(`${client.user.username} Help`).setDescription(`Please specify a command you want to view help for. To see a list of available commands, use \`${prefix} commands <category>\` to view the commands for a specific category or \`${prefix} commands all\` to view all available commands.

If you need help beyond what the commands provide, feel free to use \`${prefix} support\` and join our support server. We're always happy to help with any troubles you might have.`).setThumbnail(client.user.displayAvatarURL())]});
          }

          if (cmd.name) embed.setTitle(`${cmd.name}`);
          if (cmd.description) embed.setDescription(`${cmd.description}`);
          if (cmd.aliases) try {
            embed.addField("Aliases", `${cmd.aliases.map((a) => `${a}`).join(", ")}`)
  } catch {}
 embed.setFooter("Bot by Kurai", "https://images-ext-1.discordapp.net/external/fuHdk6_1i9W6Or8a8v7NfWifc2iv-8iZajYwvS8ixhw/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/396906512469196811/f43ba3c16da2837c83076a20cf18e08e.png")         
          return message.channel.send({embeds: [embed.setColor(client.embedColor)]});
} else {
// creating embeds
const  embed1 = new EmbedBuilder()

        .setColor(client.embedColor)
        .setTitle(`${client.user.username} Help`)
.setDescription(`Please specify a command you want to view help for. To see a list of available commands, \`${prefix} commands all\` to view all available commands.

If you need help beyond what the commands provide, feel free to use \`${prefix} support\` and join our support server. We're always happy to help with any troubles you might have.`)
        .setThumbnail(client.user.displayAvatarURL())
return message.channel.send({embeds: [embed1]})
}
  },
};
