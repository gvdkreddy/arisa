const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Search extends AvonCommand {
    get name() {
        return 'search'
    }
    get inVoice() {
        return true;
    }
    get cat() {
        return 'music'
    }
    get sameVoice() {
        return true;
    }

    async run(client, message, args, prefix) {
        try {
            if (!args[0]) {
                return message.channel.send({
                    embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}search <name/song url>\``).setAuthor({ name: `Search`, iconURL: message.guild.iconURL() }).setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTimestamp()]
                })
            }
            let channel = message.member.voice.channel;
            var player = client.poru.players.get(message.guild.id);
            if (!player) {
                player = await client.poru.createPlayer({
                    guildId: message.guild.id,
                    voiceId: channel.id,
                    textId: message.channel.id,
                    deaf: true,
                    volume: 100,
                    shardId: message.guild.shardId
                });
            }
            let query = args.join(" ");

            player.setTextChannel(message.channel.id);
            if (query.startsWith('https://')) {
                if (query.includes(`youtube`)) {
                    return message.channel.send({
                        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I don't resolve youtube links anymore due to Youtube's TOS Violation`).setAuthor({ name: `Search`, iconURL: message.guild.iconURL() }).setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTimestamp()]
                    });
                }
                if (query.includes(`youtu.be`)) {
                    return message.channel.send({
                        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I don't resolve youtube links anymore due to Youtube's TOS Violation`).setAuthor({ name: `Search`, iconURL: message.guild.iconURL() }).setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTimestamp()]
                    });
                }
            }
            let result = await player.search(query, { requester: message.author });
            if (!result.tracks.length) {
                return interaction.update({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No Results were found`).setAuthor({ name: `Search`, iconURL: message.guild.iconURL() }).setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setTimestamp()], components: [] });
            }

            const results = result.tracks.slice(0, 10).map((track, index) => ({
                label: `${index + 1}. ${track.title.length > 40 ? track.title.slice(0, 40) + "..." : track.title}`,
                value: track.uri,
            }));

            const select = new StringSelectMenuBuilder()
                .setCustomId("select")
                .setPlaceholder("❯ Select a Track to play")
                .addOptions(results || []);

            const replacingoptionifnotfound = new StringSelectMenuBuilder()
                .setCustomId("select2")
                .setPlaceholder("❯ Select a Track to play")
                .addOptions([
                    {
                        label: `No Similar Songs Found`,
                        value: "no",
                    },
                ]);
            const ajju = results.map(track => `[${track.label}](https://discord.gg/aMC2e8zgQb)`).join('\n');
            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setThumbnail( client.user.displayAvatarURL({ dynamic: true }))
                .setAuthor({
                    name: `| Select a Track to play`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
                .setDescription(ajju);

            const msg = await message.channel.send({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(select)],
            });

            const filter = (i) => i.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({
                filter:(o) =>{
                if(o.user.id === message.author.id) return true;
                else{
                    return o.reply({content : `${client.emoji.cross} | Not For You.!, Do \`${prefix}search\` For Your Session.`,ephemeral : true})
                }
            },
                filter,
                time: 45000,
            });

            collector.on("collect", async (i) => {
                if (i.customId === "select") {
                    if (i.values[0] === "no") return;
                    if (!i.member.voice.channelId && i.user.id !== client.user.id) return i.reply({
                        content: "\`\`\`fix\nYou are not in a voice channel!\`\`\`",
                        ephemeral: true,
                    });

                    if (i.member.voice.channelId !== player.voiceId) return i.reply({
                        content: `\`\`\`fix\nYou are not in\`\`\` ${
                            player.voiceId
                                ? `<#${player.voiceId}> \`\`\`fix\nTo Use Me!\`\`\``
                                : "\`\`\`fix\nthe same voice channel!\`\`\`"
                        }`,
                        ephemeral: true,
                    });

                    const track = await player.search(i.values[0], { engine: `youtube`, requester: i.user })
                        .then((x) => x.tracks[0]);

                    if (!track) return;

                    player.queue.add(track);
                    if (!player.playing && !player.paused && !player.queue.size) player.play();

                    i.update({
                        embeds: [
                            embed
                                .setAuthor({
                                    name: `| Added to Queue`,
                                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                                })
                                .setDescription(`${this.client.emoji.queue} : [${track.title}](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`),
                        ],
                        components: [],
                    });
                }
            });

            collector.on("end", async (i) => {
                if (i.size === 0) {
                    msg.edit({
                        embeds: [
                            embed
                                .setDescription(`\`\`\`diff\n-Selection Was Timed Out\`\`\``),
                        ],
                        components: [
                        ],
                    });
                }
            });

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = Search;
