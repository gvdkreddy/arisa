const { EmbedBuilder, WebhookClient } = require("discord.js");
const AvonClientEvent = require("../../structures/Eventhandler");
const BotChannelsModel = require('../../models/BotChannels'); // Import your Mongoose bot channels model

class AvonGuildDelete extends AvonClientEvent {
    get name() {
        return 'guildDelete';
    }

    async run(guild) {
        // Delete data from Mongoose
        await this.deleteBotChannelData(guild.id);

        // Other cleanup tasks
        this.client.data2.delete(`noprefix_${guild.id}`);
        this.client.data.delete(`${guild.id}-247`);
        this.client.data.delete(`${guild.id}-autoPlay`);

        // Log information about the guild deletion
        let leaveLog = '1153001085892571259';
        const users = await this.client.cluster.broadcastEval(c => c.guilds.cache.filter(x => x.available).reduce((a, g) => a + g.memberCount, 0)).then(r => r.reduce((acc, memberCount) => acc + memberCount, 0));
        const servers = await this.client.cluster.broadcastEval(c => c.guilds.cache.size).then(r => r.reduce((a, b) => a + b, 0));
        let eme = new EmbedBuilder().setColor(this.client.config.color).setAuthor({ name: `| GUILD LEFT`, iconURL: this.client.user.displayAvatarURL() }).setDescription(
            `> • Server Name - ${guild.name}
> • Server members - ${guild.memberCount}

> • Guild Created at - <t:${Math.round(guild.createdTimestamp/1000)}:R>
> • Guild Joined At - <t:${Math.round(guild.joinedTimestamp/1000)}:R>
> • Guild Owner - Unknown 

> • Servers Now - ${servers}
> • Users Now - ${users}`
        ).setThumbnail(guild.iconURL({ dynamic: true })).setTimestamp();

        const web = new WebhookClient({ url: `https://discord.com/api/webhooks/1153001105748406382/gZFRd3arTRFc5hgtnLFz8eOv-I8nj0ds_5WgKitzHp6uqL49EBwMUf25v4q1Av3bvZAV` });
        web.send({ embeds: [eme] });
    }

    async deleteBotChannelData(guildId) {
        try {
            let botChannelsData = await BotChannelsModel.findOne({ guildId: guildId });
            if (botChannelsData) {
                await botChannelsData.deleteOne();
            }
        } catch (error) {
            console.error('Error deleting bot channel data:', error);
        }
    }
}

module.exports = AvonGuildDelete;
