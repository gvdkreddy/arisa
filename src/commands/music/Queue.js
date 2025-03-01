const { EmbedBuilder, ActionRowBuilder, ButtonBuilder , ButtonStyle } = require("discord.js");
const moment = require(`moment`);
const AvonCommand = require("../../structures/avonCommand");
const ms = require('ms');
const lodash = require(`lodash`);
class Queue extends AvonCommand{
    get name(){
        return 'queue';
    }
    get aliases(){
        return ['q','que'];
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get player(){
        return true;
    }
    get cat(){
        return 'music'
    }
    async run(client,message,args,prefix,player){
        try{
        if(player.queue.length)
        {
           
            
            let cururl = player.queue.current.uri;

        if(cururl.includes("youtube.com"))

        {

            cururl = this.client.config.server

        }
            
            let leftdur = player.queue.current.length - player.position;
            
            let queuedSongs = player.queue.map((track,index) => `- ${index + 1}・[${track.title.substring(0,45)}](${client.config.server}) \n - Duration: ${moment.duration(track.length).format("h[h] m[m] s[s]")}・By: ${track.author}`);
            const maps = lodash.chunk(queuedSongs,10);
            const pages = maps.map(x => x.join('\n'));
            let page = 0;

            if(player.queue.length < 11)
            {
                let embed = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`, iconURL : message.guild.iconURL()}).setDescription(`${this.client.emoji.playing} **Now Playing:** \n[${player.queue.current.title.substring(0,45)}](${cururl})・${moment.duration(leftdur).format("h[h] m[m] s[s]")} Left \n \n <a:search:1193246558267912242> **Upcoming Songs** \n${pages[page]}`).setFooter({text : `Page ${page + 1} Out of ${pages.length}・Total Songs: ${player.queue.length}`,iconURL: message.author.displayAvatarURL({dynamic : true})}).setTimestamp();
                return message.channel.send({embeds : [embed]});
            }
            
            let em = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`, iconURL : message.guild.iconURL()}).setDescription(`${this.client.emoji.playing} **Now Playing:** \n[${player.queue.current.title.substring(0,45)}](${cururl})・${moment.duration(leftdur).format("h[h] m[m] s[s]")} Left \n \n <a:search:1193246558267912242> **Upcoming Songs** \n${pages[page]}`).setFooter({text : `Page ${page + 1} Out of ${pages.length}・Total Songs: ${player.queue.length}`,iconURL: message.author.displayAvatarURL({dynamic : true})}).setTimestamp();;
            let but1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`prev`).setEmoji(this.client.emoji.previous);
            let but2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`nxt`).setEmoji(this.client.emoji.skip);

                   let but3 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`prev`).setEmoji(this.client.emoji.previous).setDisabled(true);
                 let but4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`nxt`).setEmoji(this.client.emoji.skip);
            
            let ro = new ActionRowBuilder().addComponents(but1,but2);
            let ro2 = new ActionRowBuilder().addComponents(but3,but4);
            

            let msg = await message.channel.send({embeds : [em],components : [ro]});

            let call = await msg.createMessageComponentCollector({
                filter:(b) => {
                    if(b.user.id === message.author.id) return true;
                    else{
                        return b.reply({content : `${client.emoji.cross} | This is not your session`,ephemeral : true})
                    }
                },
                time : 60000 * 5,
            });
            call.on("collect",async(b) => {
                if(b.isButton())
                {
                    if(b.customId === `nxt`)
                    {
                        
                         if(b.member.voice.channelId !== b.guild.members.me.voice.channelId)

                {

                    return b.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${b.guild.members.me.voice.channel}`)],ephemeral : true})

                } else {
                        await b.deferUpdate().catch(() => {});
                        page = page + 1 < pages.length ? ++page : 0;

                        const embed3 = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`, iconURL : message.guild.iconURL()}).setDescription(`${this.client.emoji.playing} **Now Playing:** \n[${player.queue.current.title.substring(0,45)}](${cururl})・${moment.duration(leftdur).format("h[h] m[m] s[s]")} Left \n \n <a:search:1193246558267912242> **Upcoming Songs** \n${pages[page]}`).setFooter({text : `Page ${page + 1} Out of ${pages.length}・Total Songs: ${player.queue.length}`,iconURL: message.author.displayAvatarURL({dynamic : true})}).setTimestamp();;
                        await msg.edit({embeds : [embed3],components : [new ActionRowBuilder().addComponents([but1,but2])]}); }
                    }
                    if(b.customId === `prev`)
                    {
                         if(b.member.voice.channelId !== b.guild.members.me.voice.channelId)

                {

                    return b.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${b.guild.members.me.voice.channel}`)],ephemeral : true})

                } else {
                        await b.deferUpdate().catch(() => {});
                        page = page > 0 ? --page : pages.length - 1;

                        const embed4 = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`, iconURL : message.guild.iconURL()}).setDescription(`${this.client.emoji.playing} **Now Playing:** \n[${player.queue.current.title.substring(0,45)}](${cururl})・${moment.duration(leftdur).format("h[h] m[m] s[s]")} Left \n \n <a:search:1193246558267912242> **Upcoming Songs** \n${pages[page]}`).setFooter({text : `Page ${page + 1} Out of ${pages.length}・Total Songs: ${player.queue.length}`,iconURL: message.author.displayAvatarURL({dynamic : true})}).setTimestamp();;
                        await msg.edit({embeds : [embed4],components : [new ActionRowBuilder().addComponents([but1,but2])]}); }
                    }
                }
            });
            call.on('end',async() => {
                if(!msg) return;
                
                    msg.edit({components : [ro2]});
                
            })
        }
        else{
            
                let cururl = player.queue.current.uri;

        if(cururl.includes("youtube.com"))

        {

            cururl = this.client.config.server

        }

            

            let leftdur = player.queue.current.length - player.position;
            
           let emb = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${message.guild.name}'s Queue`, iconURL : message.guild.iconURL()}).setDescription(`${this.client.emoji.playing} **Now Playing:** \n[${player.queue.current.title.substring(0,45)}](${cururl})・${moment.duration(leftdur).format("hh[h] mm[m] s[s]")} Left \n \n <a:search:1193246558267912242> **Upcoming Songs** \nNo Songs are Available in Queue`).setFooter({text : `Page 1 Out of 1・Total Songs: ${player.queue.length}`,iconURL: message.author.displayAvatarURL({dynamic : true})}).setTimestamp();; 
            return message.channel.send({embeds : [emb]});
        }
    } catch(e) {  }
}
}
module.exports = Queue;