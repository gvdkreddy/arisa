const { EmbedBuilder } = require("discord.js");
const Arisa = require("../../structures/avonCommand");
const { getLyrics } = require("genius-lyrics-api");

class Lyrics extends Arisa {
    get name() {
        return 'lyrics';
    }

    get player() {
        return true;
    }

    get cat() {
        return 'music';
    }

    get inVoice() {
        return false;
    }

    get sameVoice() {
        return false;
    }

    async run(client, message, args, prefix, player) {
        const noLyricsEmbed = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}lyrics <song name>\``)
 .setAuthor({
                name: `| Lyrics`,
                iconURL: message.guild.iconURL(),
            })          
        .setFooter({
                text: `| Requested by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true }),
            })

            .setTimestamp()
            .setColor(client.config.color);

        await message.channel.sendTyping();

        const songName = player.queue.current.title;

        try {
            const options = {
                apiKey: "dWlMJZeSNC1OJASuBES51OpK9bZm-r1ZnDFVmAeiZQtHh-eCbYgfXL9N2OVjGa2z", // Your Genius API key
                title: songName,
               	artist: player.queue.current.author,
                optimizeQuery: true
            };

            const lyrics = await getLyrics(options);

            if (!lyrics) {
                throw new Error("Lyrics not found");
            }

            const lyricsEmbed = new EmbedBuilder()
                .setColor(client.config.color)
                .setDescription(lyrics)
                .setAuthor({
                name: `| Lyrics`,
                iconURL: message.guild.iconURL(),
            })              
                .setTitle(songName)
.setFooter({
                text: `| Requested by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true }),
            })
                .setTimestamp();

            return message.channel.send({ embeds: [lyricsEmbed] });
        } catch (error) {
            console.error("Error fetching or parsing lyrics:", error);
            noLyricsEmbed.setDescription(`${client.emoji.cross} | No lyrics were found for the given query.`);
            return message.channel.send({ embeds: [noLyricsEmbed] });
        }
    }
}

module.exports = Lyrics;
