const { EmbedBuilder } = require('discord.js');
const ArisaCommand = require('../../structures/avonCommand');

class SettingsCommand extends ArisaCommand {
    get name() {
        return 'config';
    }
    get aliases() {
        return ['set', 'setting', "settings"];
    }
    get cat() {
        return 'set';
    }

    async run(client, message, args, player) {
        let data = await client.data.get(`${message.guild.id}-autoPlay`);
        let db = await client.data.get(`${message.guild.id}-247`);
        let okk = await client.data.get(`${message.guild.id}-prefix`);
        okk = okk || "+";
        let voiceChannel = message.guild.members.me.voice.channel;
        const embed = new EmbedBuilder() // Use EmbedBuilder
            .setColor(client.config.color)
            .setTitle(`Settings For ${message.guild.name}`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setImage(`https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif?width=585&height=75`)
            .addFields([
                { name: `<:HighVolume:1151059395573194854> __Connected Channel__`, value: `<:white_arrow:1172534680600457317> ${voiceChannel ? voiceChannel : "Not Connected"}`, inline: false },
               
                { name: `<:Prefix:1163146222564036638> __Prefix__`, value: `\`\`\`${okk}help\`\`\``, inline: true },
                { name: `<:Prefix:1163146222564036638> __24/7__`, value: `${db === 'enabled' ? '\`\`\`Enabled\`\`\`' : '\`\`\`Disabled\`\`\`'}`, inline: true },
                { name: `<:Prefix:1163146222564036638> __Autoplay__`, value: `${data === 'enabled' ? '\`\`\`Enabled\`\`\`' : '\`\`\`Disabled\`\`\`'}`, inline: true }
            ]);

        return message.channel.send({ embeds: [embed] });
    }
}

module.exports = SettingsCommand;
