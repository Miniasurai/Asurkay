const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { version } = require(`../../../package.json`);
const os = require('os');
require('ms');

module.exports = {
  name: "ping",
  category: "Random",
  description: "Displays the bot's ping.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  run: async (message, args, client, prefix) => {

    const msg = await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.embedColor)
                        .setAuthor({ name: 'Pinging... Please wait.', iconURL: client.user.avatarURL() })
                ]
            })
            setTimeout(() => {
                // Function Uptime
                let days = Math.floor(client.uptime / 86400000)
                let hours = Math.floor(client.uptime / 3600000) % 24
                let minutes = Math.floor(client.uptime / 60000) % 60
                let seconds = Math.floor(client.uptime / 1000) % 60

                // Latency Check
                let webLatency = new Date() - message.createdAt
                let apiLatency = client.ws.ping
                let totalLatency = webLatency + apiLatency

                // Emoji
                let emLatency = {
                    Green: '🟢',
                    Yellow: '🟡',
                    Red: '🔴'
                }

                // Second
                msg.edit({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.embedColor)
                            .setTitle(`Returns Latency And API Ping`)
                            .setFields([
                                {
                                    name: `📡 Websocket Latency`,
                                    value: `\`${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${webLatency}\`ms`,
                                    inline: true
                                },
                                {
                                    name: `🛰 API Latency`,
                                    value: `\`${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${apiLatency}\`ms`,
                                    inline: true
                                },
                                {
                                    name: `⏲ Uptime`,
                                    value: `\`${days}Days\` : \`${hours}Hrs\` : \`${minutes}Mins\` : \`${seconds}Secs\``,
                                    inline: true
                                }
                            ])
                            .setFooter({ text: `${client.user.username} · v${version}`, iconURL: message.client.user.displayAvatarURL() })
                    ]
                })
            }, 1500)
  }
}