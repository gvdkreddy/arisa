const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require(`discord.js`);
const AvonCommand = require("../../structures/avonCommand");

class AvatarCommand extends AvonCommand {
    get name() {
        return 'avatar';
    }

    get aliases() {
        return ['av'];
    }

    get cat() {
        return 'utility';
    }

    async run(client, message, args, prefix) {
        let member;

        // Check if a user ID is provided
        if (args.length && /^\d+$/.test(args[0])) {
            member = await message.guild.members.fetch(args[0]).catch(() => null);
        } else {
            member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
        }
        let lmao = new EmbedBuilder()
            .setAuthor({ name: `| User Not Found`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
            .setColor(client.config.color);
        if (!member) {
            return message.channel.send({ embeds: [lmao] });
        }

        // Create avatar embed
        let av = new EmbedBuilder()
            .setAuthor({ name: `Avatar - ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
            .setColor(client.config.color)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }));

        // Check if the user has a banner
        let bn = null;
        if (member.user.bannerURL()) {
            bn = new EmbedBuilder()
                .setAuthor({ name: `Banner - ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
                .setColor(client.config.color)
                .setImage(member.user.bannerURL({ dynamic: true, size: 4096 }));
        } else {
            bn = new EmbedBuilder()
                .setAuthor({ name: `No Banner - ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
                .setColor(client.config.color)
                .setDescription(`This user does not have a banner.`);
        }

        // Create avatar and banner buttons
        const avatarButton = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Avatar').setCustomId('avatarButton');
        const bannerButton = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Banner').setCustomId('bannerButton');

        // Create action row with buttons
        const actionRow = new ActionRowBuilder().addComponents(avatarButton, bannerButton);

        // Create initial embed
        let embed = new EmbedBuilder()
            .setAuthor({ name: `| Choose Your Preferred Option`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 4096 }) })
            .setColor(client.config.color)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }));

        // Send message with initial embed and buttons
        const msg = await message.channel.send({ embeds: [embed], components: [actionRow] });

        // Create button collector
        const collector = msg.createMessageComponentCollector({ filter: i => i.user.id === message.author.id, time: 30000 });

        collector.on('collect', async i => {
            if (i.customId === 'avatarButton') {
                await i.update({ embeds: [av] });
            } else if (i.customId === 'bannerButton') {
                await i.update({ embeds: [bn] });
            }
        });

        collector.on('end', collected => {
            // Remove buttons after 30 seconds
            msg.edit({ components: [] });
        });
    }
}

module.exports = AvatarCommand;
