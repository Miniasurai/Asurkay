const { EmbedBuilder } = require('discord.js');

//=====================================| Code |=====================================\\

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    cooldown: 5,
    category: 'Random',
    descriptions: 'show profile',
    usage: 'avatar ([User])',

    run: async (message, args, client, prefix) => {
        
            let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.author;
          const embed = new EmbedBuilder()
            .setDescription(`${member}'s Avatar`)
            .setImage(`${member.displayAvatarURL({ dynamic: true, size: 2048 })}`)
            .setTimestamp()
            .setColor(client.embedColor);
          message.reply({ embeds: [embed] });
        
    }
}
