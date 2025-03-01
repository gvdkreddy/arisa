const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");
const moment = require(`moment`);
require(`moment-duration-format`);

class Help extends AvonCommand{
    get name(){
        return 'help';
    }
    get aliases(){
        return 'h'
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        try{
         let uptime = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
        let em = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `${client.user.username}'s Help Menu`,iconURL : client.user.displayAvatarURL()}).setDescription(  `<:icons_eventcolour_416:1061555545045204992> **__Arisa__**  is a Feature-rich Bot built to Deliver the Best Music Experience. \n<a:arrow_kastro:1064408073478869002> **__Arisa's__** Prefix is \`${prefix}\` For This Server.`).addFields({
            name : `\n <:Icon_Category:1081877655789506590> **__Primary Modules__** :`,
            value : `>>> ${client.emoji.music} \`:\` Music \n ${client.emoji.filters} \`:\` Filters \n ${client.emoji.settings} \`:\` Config \n ${client.emoji.queue} \`:\` Playlist`,
        inline : true},
        {
            name : `\n <:Icon_Category:1081877655789506590> **__Secondary Modules__** :`,
            value : `>>> <:iconsss_Download:1061555578062770238> \`:\` Image \n <:icons_ban:1061555539974291508> \`:\` Moderation \n ${client.emoji.vip} \`:\` Utility \n ${client.emoji.info} \`:\` Information`,
            inline : true
        }).addFields({
            name : `\n <:icons_colorserververified:1061555559091929139> **__STATS__** :\n\n`,
            value : `>>> <:icon_servers:1081875435345936394> **Servers** \`:\` \`${client.guilds.cache.size}\` \n ${client.emoji.ping} **Latency** \`:\` \`${Math.floor(client.ws.ping)}ms\` \n <:api_latency_kastro:1064433448242122803> ** Uptime. **\`:\` \`${uptime}\`\n<:icons_friends:1075829083260325929> **Trusted By** \`:\` \`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}+ Users\``}).setFooter({text : `Made By Kronixx Development` , iconURL : message.guild.iconURL({dynamic : true})}).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif")

        let b1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`m1`).setEmoji(client.emoji.music);
        let b2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`m2`).setEmoji(client.emoji.filters);
        let b3 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`m3`).setEmoji(client.emoji.settings);
        let b4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`m4`).setEmoji(client.emoji.info);
        let b5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`m5`).setEmoji(client.emoji.allCommands);
        let b11 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Support`).setURL(`https://discord.gg/aMC2e8zgQb`);
        let b12 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Invite`).setURL(`https://discord.com/api/oauth2/authorize?client_id=1027828697828433980&permissions=279230934336&scope=bot`);
        let b13 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`);
        let ro = new ActionRowBuilder().addComponents(b11,b12,b13);

        let select = new SelectMenuBuilder().setCustomId(`ok`).setPlaceholder(`Click To See My Categories`).addOptions([
            {
                label : `Home`,
                emoji : `${client.emoji.home}`,
                value : `ok1`,
                description : `Show's The Home Page`
            },
            {
                label : `Music`,
                emoji : `${client.emoji.music}`,
                value : `ok2`,
                description : `Show's Music Command's`
            },
            {
                label : `Filters`,
                emoji : `${client.emoji.filters}`,
                value : `ok3`,
                description : `Show's Filter Command's`
            },
            {
                label : `Image`,
                emoji : `<:iconsss_Download:1061555578062770238>`,
                value : `ok0`,
                description : `Show's Image Command's`
            },
            {
                label : `Moderation`,
                emoji : `<:icons_ban:1061555539974291508>`,
                value : `ban`,
                description : `Show's Moderation Command's`
            },
            {
                label : `Config`,
                emoji : `${client.emoji.settings}`,
                value : `ok4`,
                description : `Show's Config Command's`
            },
            {
                label : `Playlist`,
                emoji : `${client.emoji.queue}`,
                value : `ok000`,
                description : `Show's Playlist Command's`
            },
            {
                label : `Utility`,
                emoji : `${client.emoji.vip}`,
                value : `ok00`,
                description : `Show's Utility Command's`
            },
            {
                label : `Information`,
                emoji : `${client.emoji.info}`,
                value : `ok5`,
                description : `Show's Info Command's`
            },
            {
                label : `All Commands`,
                emoji : `${client.emoji.allCommands}`,
                value : `ok6`,
                description : `Show's All Command's`
            },
        ]);
        let ro2 = new ActionRowBuilder().addComponents(select);

        let em1 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Music Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `music`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `music`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
        let em2 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Filter Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `filters`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `filters`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
            let bon = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Moderation Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `mod`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `mod`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
        let em0 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Image Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `img`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `img`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
          let em000 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Playlist Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `playlist`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `playlist`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
            let em00 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Utility Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `utility`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `utility`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
        let em3 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Config Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `set`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `set`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
        let em4 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields({name : `__Information Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `info`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `info`).map(r => `\`${r.name}\``).sort().join(`, `)}`});
        
        let em5 = new EmbedBuilder().setColor(client.config.color).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setImage("https://media.discordapp.net/attachments/1063839542798454864/1075060427601498222/standard_3.gif").addFields([
            {
                name : `__Music Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `music`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `music`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
            {
                name : `__Filter Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `filters`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `filters`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
            {
                name : `__Moderation Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `mod`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `mod`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
            {
                name : `__Config Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `set`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `set`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
            {
                name : `__Image Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `img`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `img`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
            {
                name : `__Playlist Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `playlist`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `playlist`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
           {
                name : `__Utility Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `utility`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `utility`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            },
            {
                name : `__Information Commands__ [${client.AvonCommands.commands.filter(x => x.cat && x.cat === `info`).size}]`,value : `${client.AvonCommands.commands.filter(x => x.cat && x.cat === `info`).map(r => `\`${r.name}\``).sort().join(`, `)}`
            }
        ]).setFooter({text : `Developed with ❤️ By Kronixx Development` , iconURL : message.guild.iconURL({dynamic : true})})


        let msg = await message.channel.send({embeds : [em],components : [ro,ro2]});
        let call = await msg.createMessageComponentCollector({
            filter:(o) =>{
                if(o.user.id === message.author.id) return true;
                else{
                    return o.reply({content : `${client.emoji.cross} | This is not your session run ${prefix}help instead.`,ephemeral : true})
                }
            },
            time : 50000,
        });
        call.on('collect',async(int) => {
            if(int.isButton())
            {
                if(int.customId === `m1`)
                {
                    return int.update({embeds : [em1]});
                }
                if(int.customId === `m2`)
                {
                    return int.update({embeds : [em2]});
                }
                if(int.customId === `m3`)
                {
                    return int.update({embeds : [em3]});
                }
                if(int.customId === `m4`)
                {
                    return int.update({embeds : [em4]});
                }
                if(int.customId === `m5`)
                {
                    return int.update({embeds : [em5]});
                }
            }
            if(int.isSelectMenu())
            {
                for(const value of int.values)
                {
                    if(value === `ok1`)
                    {
                        return int.update({embeds : [em]});
                    }
                    if(value === `ok2`)
                    {
                        return int.update({embeds : [em1]});
                    }
                    if(value === `ok3`)
                    {
                        return int.update({embeds : [em2]});
                    }
                    if(value === `ok4`)
                    {
                        return int.update({embeds : [em3]});
                    }
                    if(value === `ok0`)
                    {
                        return int.update({embeds : [em0]});
                    }
                    if(value === `ban`)
                    {
                        return int.update({embeds : [bon]});
                    }
                    if(value === `ok00`)
                    {
                        return int.update({embeds : [em00]});
                    }
                    if(value === `ok000`)
                    {
                        return int.update({embeds : [em000]});
                    }
                    if(value === `ok5`)
                    {
                        return int.update({embeds : [em4]});
                    }
                    if(value === `ok6`)
                    {
                        return int.update({embeds : [em5]});
                    }
                    
                }
            }
        });
        call.on('end',async() => {
            if(!msg) return;
            msg.edit({embeds : [em],components : [ro],content : `${client.emoji.info} | Help command is Timed Out.!\n Run \`${prefix}help\` again to explore.`})
        });
    } catch(e) { console.log(e) }
} 
}
module.exports = Help;