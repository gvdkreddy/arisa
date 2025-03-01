const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { muzicard } = require("muzicard");
const moment = require(`moment`);
const AvonCommand = require("../../structures/avonCommand");

class Nowplaying extends AvonCommand {
    get name() {
        return 'nowplaying'
    }
    get aliases() {
        return ['np']
    }
    get inVoice() {
        return true;
    }
    get player() {
        return true;
    }
    get cat() {
        return 'music'
    }
    async run(client, message, args, prefix, player) {
        const currentTime = moment.duration(player.position).asMinutes();
        const totalTime = moment.duration(player.queue.current.length).asMinutes();
        const progressBar = createProgressBar(currentTime, totalTime, 20); // You can adjust the progress bar length (e.g., 20).
        const percentageCompletion = (currentTime / totalTime ) * 100;
        const roundedPercentage = Math.round(percentageCompletion);

         const card = new muzicard()
        .setName(player.queue.current.title)
        .setAuthor(player.queue.current.author)
        .setColor("auto")
        .setTheme("neonx")
        .setBrightness(100)
        .setThumbnail(player.queue.current.thumbnail)
        .setProgress(roundedPercentage)
        .setStartTime(moment.duration(player.position).format("hh:mm:ss"))
        .setEndTime(moment.duration(player.queue.current.length).format("hh:mm:ss"))

    const buffer = await card.build();
    const attachment = new AttachmentBuilder(buffer, { name: `muzicard.png` });
        
        const em = new EmbedBuilder()
            .setDescription(`**[${player.queue.current.title}](https://discord.gg/aMC2e8zgQb)**`)
            .setColor(this.client.config.color)
            .setThumbnail(`${player.queue.current.thumbnail}`)
            .addFields([
                { name: `${this.client.emoji.author} __Author__`, value: `<:white_arrow:1172534680600457317> ${player.queue.current.author}`, inline: true },
                { name: `${this.client.emoji.users} __Requester__`, value: `<:white_arrow:1172534680600457317> ${player.queue.current.requester}`, inline: true },
                { name: `${this.client.emoji.time} __Duration__`, value: `<:white_arrow:1172534680600457317> ${currentTime.toFixed(2)} / ${totalTime.toFixed(2)} Mins`, inline: true },
                { name: `${this.client.emoji.time} __Progress__`, value: `<:white_arrow:1172534680600457317> ${progressBar}`, inline: false },
            ])
            .setTimestamp();
        message.channel.send({ files: [attachment] });
    }
}

function createProgressBar(current, total, length) {
    const progress = current / total;
    const progressBar = "<:Progress2:1196672059204440064>".repeat(Math.floor(progress * length)) + "<:progress:1196671898453549118>".repeat(length - Math.floor(progress * length));
    return progressBar;
}

module.exports = Nowplaying;
