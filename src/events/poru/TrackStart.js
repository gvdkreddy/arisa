const { AttachmentBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const AvonClientEvent = require(`../../structures/Eventhandler`);
const { muzicard } = require("muzicard");
const canvafy = require("canvafy");
const moment = require(`moment`);
require(`moment-duration-format`);
class TrackStart extends AvonClientEvent{
    get name(){
        return 'playerStart'
    }
    async run(player,track,message){
        let url = track.uri;
        if(url.includes("youtube.com"))
        {
            url = this.client.config.server
        }
        let emb = new EmbedBuilder().setColor(this.client.config.color).setDescription(`[${track.title}](${url})`).addFields([
            {name : `${this.client.emoji.author} __Author__` , value : `<:white_arrow:1172534680600457317> ${track.author}` , inline : true},
            {name : `${this.client.emoji.users} __Requester__` , value : `<:white_arrow:1172534680600457317> ${track.requester}`,inline : true},
            {name : `${this.client.emoji.time} __Duration__`,value : `<:white_arrow:1172534680600457317> ${moment.duration(player.queue.current.length).format("hh:mm:ss")}`,inline : true}
        ]).setAuthor({name : `| Now Playing` , iconURL : this.client.user.displayAvatarURL()}).setThumbnail(player.queue.current.thumbnail).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").setFooter({text : `Previous Used Filters Maybe Turned On.!`})
        const channel = this.client.channels.cache.get(player.textId);
        let duration = moment.duration(player.queue.current.length).format("hh:mm:ss");
        
        let but1 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(`<:icons_stop_button:1078967389267439636>`).setCustomId(`pl1`);
        let but2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(`<:icons_pause:1078966600608260096>`).setCustomId(`pl2`);
        let but3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji(`<:icons_loop:1078966908591812678>`).setCustomId(`pl3`);
        let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(`<:astoria_skip:1193775342272389140>`).setCustomId(`pl5`);
        let but9 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(`<:astoria_previous:1193775439387316274>`).setCustomId(`pl4`);
let ro = new ActionRowBuilder().addComponents(but1,but9,but2,but5,but3);
let select = new SelectMenuBuilder().setCustomId(`ok`).setPlaceholder(`Click To Choose Filter's`).addOptions([
            {
                label : `Clear Filters`,
                description : `Clear's All Filter's`,
                emoji : `<:icons_delete:1061555554423672893>`,
                value : `cf`
            },
            {
                label : `Bassboost`,
                description : `Set's Bassboost Filter`,
                emoji : `<:icons_1:1082310750778966106>`,
                value : `bb`
            },
            {
                label : `China`,
                description : `Set's China Filter`,
                emoji : `<:icons_2:1082310737214586980>`,
                value : `cn`
            },
            {
                label : `Chipmunk`,
                description : `Set's Chipmunk Filter`,
                emoji : `<:icons_3:1082311228724084807>`,
                value : `cm`
            },
            {
                label : `TrebleBass`,
                description : `Set's TrebleBass Filter`,
                emoji : `<:icons_4:1082311277986205769>`,
                value : `dv`
            },
            {
                label : `Vaporwave`,
                description : `Set's Vaporwave Filter`,
                emoji : `<:icons_5:1082311394441035897>`,
                value : `dt`
            },
            {
                label : `Nightcore`,
                description : `Set's Nightcore Filter`,
                emoji : `<:icons_6:1082310813320220692>`,
                value : `nc`
            },
            {
                label : `8D`,
                description : `Set's 8D Filter`,
                emoji : `<:icons_7:1082310828579094590>`,
                value : `8d`
            },
            {
                label : `Slow Mode`,
                description : `Set's Slowmode Filter`,
                emoji : `<:icons_8:1082310890503819395>`,
                value : `sm`
            },
            {
                label : `Tremolo`,
                description : `Set's Tremolo Filter`,
                emoji : `<:icons_9:1082327600564813967>`,
                value : `tm`
            },
            {
                label : `Vibrato`,
                description : `Set's Vibrato Filter`,
                emoji : `<:icons_10:1082327800914133102>`,
                value : `vr`
            },
        ]);
        let haa = moment.duration(player.queue.current.length).format("hh:mm:ss");
        //const sneha = ['neon', 'neonx', 'anime', 'animex', 'animes', 'animesx', 'ravyy', 'ravyyx', 'space', 'spacex', 'bluesky', 'blueskyx' 'classic', 'dynamic'];
        const sneha = ['neonx', 'animex', 'animesx', 'ravyyx', 'blueskyx'];
        const rasmalai = sneha[Math.floor(Math.random() * sneha.length)];
      const card = new muzicard()
        .setName(track.title)
        .setAuthor(track.author)
        .setColor("auto")
        //.setColor("#EAB49E")
        .setTheme(rasmalai)
        .setBrightness(100)

        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime(haa)

      if (track.thumbnail) {
            card.setThumbnail(track.thumbnail);
        } else {
            card.setThumbnail(this.client.user.displayAvatarURL());
            }
    const buffer = await card.build();
    const attachment = new AttachmentBuilder(buffer, { name: `arisa.png` });
        const sp = await new canvafy.Spotify()
    .setAuthor(track.author)
    .setAlbum("ARISA")
    .setTimestamp(100000,track.length)
    .setImage("http://owobotcdn.com/background/36.png")
    .setTitle(track.title)
    .setBlur(5)
    .setOverlayOpacity(0.7)
    .build();
       

        let ro2 = new ActionRowBuilder().addComponents(select);
        let ad = new EmbedBuilder().setColor(this.client.config.color).setDescription(`[Want Your Server/Bot's Ad Here?? Click Here.!](https://discord.gg/aMC2e8zgQb)`).setAuthor({name : `| Advertisement` , iconURL : this.client.user.displayAvatarURL()}).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").setFooter({text : `Disappears In 15 Seconds`})
        const adc = this.client.channels.cache.get(player.textId);
            const sentMessage = await adc?.send({ embeds: [ad]});
        if (sentMessage) {
        setTimeout(() => {
            sentMessage.delete().catch(console.error);
        }, 15000); // 15 seconds
    }
                let data = await this.client.data.get(`${player.guildId}-mode`);
         if(data === `nobut`){
            if(channel){

            return channel?.send({files : [attachment]}).then(x => player.data.set("music",x));

        }
        }
        if(data === `emb+nobut`){
            if(channel){
            return channel?.send({embeds: [emb]}).then(x => player.data.set("music",x));

        }
        }
        if( data === `spoticard`){
            if(channel){
            return channel?.send({files : [sp],components : [ro2,ro]}).then(x => player.data.set("music",x));
        }
        }
        if( data === `emb+lessbut`){
            if(channel){
            return channel?.send({embeds: [emb],components : [ro2,ro]}).then(x => player.data.set("music",x));
        }
        }
        if( data === `lessbut` || data === `nothing` || data === null || !data){
            if(channel){

            return channel?.send({files : [attachment],components : [ro2,ro]}).then(x => player.data.set("music",x));

        }
        }
    }
}
module.exports = TrackStart;