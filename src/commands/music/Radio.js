const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const RadioBrowser = require('radio-browser');

const Arisa = require("../../structures/avonCommand");

class RadioCommand extends Arisa {
    get name() {
        return 'radio';
    }

    get cat() {
        return 'music';
    }

    get inVoice() {
        return true;
    }

    get sameVoice() {
        return true;
    }

    async run(client, message, args, prefix, player) {
            if(!args[0]){
                return message.channel.send({embeds : [new EmbedBuilder().setAuthor({name : `| Wrong Args`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setColor(client.config.color).setDescription(`\`\`\`${prefix}radio <query>\`\`\``)]})
            }
        let channel = message.member.voice.channel;



            if(!player){

                player = await client.poru.createPlayer({

                    guildId : message.guild.id,

                    voiceId : channel.id,

                    textId : message.channel.id,

                    deaf : true,

                    volume : 100,

                    shardId : message.guild.shardId

                });

            }
   let query = args.join(" ");

        try {
            let rfilter = {
                limit: 10,          // Limit the list to 10 items
                by: 'tag',          // Search by tag
                searchterm: `${query}` // Search term in tag (You can customize this)
            };

            const stations = await RadioBrowser.getStations(rfilter);

            if (!stations.length) {
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Radio Stations Found.`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
            }

            const results = stations.map((station, index) => ({
                label: `${index + 1}. ${station.name}`,
                value: `${station.url}`,
            }));

            const select = new StringSelectMenuBuilder()
                .setCustomId("select")
                .setPlaceholder("❯ Select a Radio Station")
                .addOptions(results || []);

            const embed = new EmbedBuilder()
                .setColor(client.config.color)
                .setDescription('Select a radio station to play:')
                .setAuthor({
                    name: `| Radio Stations`,
                    iconURL: message.guild.iconURL({ dynamic: true }),
                });

            const msg = await message.channel.send({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(select)],
            });

            const filter = (i) => i.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({
                filter,
                time: 60000, // 1 minute timeout
            });

            collector.on("collect", async (i) => {
                if (i.customId === "select") {
                    const selectedStation = stations.find(station => station.url === i.values[0]);
                   
                    embed.setDescription(`${this.client.emoji.queue} : [${selectedStation.name}](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`);
                    embed.setColor(client.config.color)
                    embed.setAuthor({
                    name: `| Added Radio To Queue`,
                    iconURL: message.guild.iconURL({ dynamic: true }),
                });
                    msg.edit({ embeds: [embed], components: [] });
                    //i.reply(`Selected Radio Station: ${selectedStation.name}`);

                    
                    player.setTextChannel(message.channel.id);

                      let result = await player.search(selectedStation.url , {requester : message.author}); 

                        player.queue.add(result.tracks[0]);

                        if(!player.playing && !player.paused) player.play();
                }
            });

            collector.on("end", async (i) => {
                if (i.size === 0) {
                    msg.edit({
                        embeds: [
                            embed.setDescription(`\`\`\`diff\n-Selection Timed Out\`\`\`\n\`\`\`fix\nNo Radio Station was selected\`\`\``),
                        ],
                        components: [],
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching radio stations:', error);
            message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| No Radio Stations Found`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}

module.exports = RadioCommand;
