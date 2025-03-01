const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder} = require("discord.js");
const Arjun = require("../../structures/avonCommand");

class Playlist extends Arjun {
    get name() {
        return 'playlist';
    }
    get aliases(){
        return ['lofi']
    }
    get cat() {
        return 'playlist';
    }
    get inVoice() {
        return true;
    }
    get sameVoice() {
        return true;
    }

    async run(client, message, args, prefix, player) {
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
        let lofi = new SelectMenuBuilder().setCustomId(`lofi`).setPlaceholder(`Click To Select Lofi Type:`).addOptions([
            {
                    label: 'Telugu Lofi',
                    emoji: '<:icons_1:1082310750778966106>',
                    description: 'Play Telugu Lofi Songs',
                    value: 'l1',
                },
                {
                    label: 'Hindi Lofi',
                    emoji: '<:icons_2:1082310737214586980>',
                    description: 'Play Hindi Lofi Songs',
                    value: 'l2',
                },
                {
                    label: 'English Lofi',
                    emoji: '<:icons_3:1082311228724084807>',
                    description: 'Play English Lofi Songs',
                    value: 'l3',
                },
                {
                    label: 'Hinglish Lofi',
                    emoji: '<:icons_4:1082311277986205769>',
                    description: 'Play Hinglish Lofi Songs',
                    value: 'l4',
                },
                {
                    label: 'Tamil Lofi',
                    emoji: '<:icons_5:1082311394441035897>',
                    description: 'Play Tamil Lofi Songs',
                    value: 'l5',
                },
        ]);
        let radio = new SelectMenuBuilder().setCustomId(`radio`).setPlaceholder(`Click To Select Radio Type:`).addOptions([
            {
                    label: 'Telugu Radio',
                    emoji: '<:icons_1:1082310750778966106>',
                    description: 'Play Telugu Radio',
                    value: 'r1',
                },
                {
                    label: 'Hindi Radio',
                    emoji: '<:icons_2:1082310737214586980>',
                    description: 'Play Hindi Radio',
                    value: 'r2',
                },
                {
                    label: 'English Radio',
                    emoji: '<:icons_3:1082311228724084807>',
                    description: 'Play English Radio',
                    value: 'r3',
                },
                {
                    label: 'Hinglish Radio',
                    emoji: '<:icons_4:1082311277986205769>',
                    description: 'Play Hinglish Radio',
                    value: 'r4',
                },
                {
                    label: 'Tamil Radio',
                    emoji: '<:icons_5:1082311394441035897>',
                    description: 'Play Tamil Radio',
                    value: 'r5',
                },
        ]);
        let ro1 = new ActionRowBuilder().addComponents(radio);
        let ro2 = new ActionRowBuilder().addComponents(lofi);
        let emb = new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Select Your Global Playlist` , iconURL : message.guild.iconURL()}).setDescription(`**<a:_dance:1068187581029826590> __Available Radio Genre's__ <a:_dance:1068187581029826590>** \n\n <a:butterflYyy:1068187615494426644> : Lofi Genre \n <a:butterflyy:1068187618724032593> : Radio Genre \n <:arrow_2077:1169202344882356307> More Soon..!`).setThumbnail(client.user.displayAvatarURL({ dynamic: true })).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif?ex=65c2418b&is=65afcc8b&hm=9aa0f21b7686bc7ecff8fdd5795a9e3594d67d050095ce8b81e21954d7f8bc3b&=&width=585&height=75")
        let msg = await message.channel.send({embeds: [emb], components: [ro2,ro1]})
        let call = await msg.createMessageComponentCollector({
            filter:(o) =>{
                if(o.user.id === message.author.id) return true;
                else{
                    return o.reply({content : `${client.emoji.cross} | This is not your session run ${prefix}radio instead.`,ephemeral : true})
                }
            },
            time : 50000,
        });
        call.on('collect',async(int) => {
            if(int.isSelectMenu())
            {
                for(const value of int.values)
                {
                    if(value === `l1`)
                    {
                        const query = "https://youtu.be/sWJ9yFVQFm4?si=AFf6RzkPVBywVFgp";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Telugu Lofi Songs](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                       
                
                    }
                    if(value === `l2`)
                    {
                        const query = "https://youtu.be/rtTI1rh9U5M?si=8W8yoKYAuH8t4G4Q";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Hindi Lofi Songs](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                       
                
                    }
                    if(value === `l4`)
                    {
                        const query = "https://youtu.be/oGg3kzoR6lw?si=PoF1KGqIQnMmoI-E";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Hinglish Lofi Songs](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                    }
                    if(value === `l3`)
                    {
                        const query = "https://youtu.be/C7WoqglcHDo?si=9ffdK4PiDYF0sytd";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [English Lofi Songs](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                       
                
                    }
                    if(value === `l5`)
                    {
                        const query = "https://youtu.be/vFgZUkiX-9Q?si=uF2-dKxIgQ784guR";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Tamil Lofi Songs](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                       
                
                    }
                    if(value === `r1`)
                    {
                        const query = "https://youtu.be/QdurBrkPQUY?si=A8xYcf9Bwx_NzkHY";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Telugu Radio](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                    }
                    if(value === `r2`)
                    {
                        const query = "https://youtu.be/APq8zUDOEwI?si=VaudJCuoEYpmaf4J";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Hindi Radio](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                    }
                    if(value === `r3`)
                    {
                        const query = "https://www.youtube.com/live/bdKS3RteSZ8?si=phqKgK0rNkT85r4r";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [English Radio](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                    }
                    if(value === `r4`)
                    {
                        const query = "https://youtu.be/KhfrMilq330?si=2VgpFD5iS14R9FuC";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Radio to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Hinglish Radio](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                    }
                    if(value === `r5`)
                    {
                        const query = "https://www.youtube.com/live/GV3VlhQQoPU?si=TZG8CGjC4GDVDFvk";
                      player.setTextChannel(message.channel.id);
                      let result = await player.search(query , {requester : message.author}); 
                        player.queue.add(result.tracks[0]);
                        if(!player.playing && !player.paused) player.play();
                        return int.update({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added Track to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${this.client.emoji.queue} : [Tamil Radio](https://discord.gg/aMC2e8zgQb) \n ${this.client.emoji.users} : ${message.author}`)], components: []});
                    }
                }
            }
        });
    }
}

module.exports = Playlist;