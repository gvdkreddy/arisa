const { PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require(`discord.js`);
const AvonCommand = require("../../structures/avonCommand");

class ServerMediaCommand extends AvonCommand {
    get name() {
        return 'serverbanner';
    }

    get cat() {
        return 'utility';
    }

    async run(client, message, args, prefix) {
        const guild = message.guild;

        const iconButton = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Server Icon').setCustomId('iconButton');
        const bannerButton = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Server Banner').setCustomId('bannerButton');

        // Create action row with buttons
        const actionRow = new ActionRowBuilder().addComponents(iconButton, bannerButton);

        // Send message with buttons
        const msg = await message.channel.send({ content: 'Choose which media to view:', components: [actionRow] });

        // Create button collector
        const collector = msg.createMessageComponentCollector({ filter: i => i.user.id === message.author.id, time: 30000 });

        collector.on('collect', async i => {
            if (i.customId === 'iconButton') {
                await i.reply({ content: 'Server Icon:', files: [guild.iconURL({ dynamic: true })] });
            } else if (i.customId === 'bannerButton') {
                const bannerURL = guild.bannerURL({ dynamic: true });
                if (bannerURL) {
                    await i.reply({ content: 'Server Banner:', files: [bannerURL] });
                } else {
                    await i.reply({ content: 'Server has no banner.', ephemeral: true });
                }
            }
        });

        collector.on('end', collected => {
            // Remove buttons after 30 seconds
            msg.edit({ components: [] });
        });
    }
}

module.exports = ServerMediaCommand;
