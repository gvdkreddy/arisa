const { EmbedBuilder, ActionRowBuilder , ButtonBuilder , ButtonStyle, SelectMenuBuilder } = require("discord.js");
const AvonClientEvents = require(`../../structures/Eventhandler`);
const config = require(`../../../config.json`);
const top = require(`@top-gg/sdk`);
const vote = new top.Api(config.topggapi);  
class AvonInteractions extends AvonClientEvents{
    get name(){
        return 'interactionCreate';
    }
    async run(interaction,message,client){

        if(interaction.isButton())
        {
            try{
            let player = this.client.poru.players.get(interaction.guild.id);
            let botch = interaction.guild.members.me.voice.channel;
            let ch = interaction.member.voice.channel;
            if(interaction.customId === `pl1`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return player.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.destroy();
                    return;
                }
            }
            if(interaction.customId === `pl2`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
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
                    let ro2 = new ActionRowBuilder().addComponents(select);
                    let but1 = new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(`<:icons_stop_button:1078967389267439636>`).setCustomId(`pl1`);
                    let but2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(!player.paused ? `<:resresumeume:1078966703704256543>` : `<:icons_pause:1078966600608260096>`).setCustomId(`pl2`);
                    let but3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji(`<:icons_loop:1078966908591812678>`).setCustomId(`pl3`);
                    let but5 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(`<:skip:1143766765063639172>`).setCustomId(`pl5`);
                    let but9 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(`<:previous:1143765653300445274>`).setCustomId(`pl4`);
                    let ro = new ActionRowBuilder().addComponents(but1,but9,but2,but5,but3);
                    
                    player.pause(!player.paused);
                    return interaction.update({components : [ro2,ro]});
                }
            }
            if(interaction.customId === `pl3`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    if(player.loop === `queue`)
                    {
                        player.setLoop(`none`);
                        return interaction.reply({embeds : [new EmbedBuilder().setDescription(`${this.client.emoji.cross} | **Disabled** Looping`)],ephemeral : true});
                    }
                    else{
                        player.setLoop(`queue`);
                        return interaction.reply({embeds : [new EmbedBuilder().setDescription(`${this.client.emoji.tick} | **Enabled** Looping`)],ephemeral : true});
                    }
                }
            }
            if(interaction.customId === `pl4`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    if(!player.queue.previous || player.queue.previous === null)
                    {
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | No Previous song available.`)],ephemeral : true})
                    }
                    else{
                        player.queue.unshift(player.queue.previous);
                        player.skip();
                        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | Playing previous track`)],ephemeral : true})
                    }
                }
            }
            if(interaction.customId === `pl5`)
            {
                if(interaction.message.id !== player.data.get('music').id)
                {
                    return interaction.message.delete();
                }
                if(interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
                {
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.cross} | You cannot use this button until connect to ${interaction.guild.members.me.voice.channel}`)],ephemeral : true})
                }
                else{
                    player.skip();
                    return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **Skipped** the track`)],ephemeral : true})
                }
            }
        }
        catch(e) { console.log(e) }
    }
    if(interaction.isSelectMenu()){
        let player = this.client.poru.players.get(interaction.guild.id);
        let botch = interaction.guild.members.me.voice.channel;
        let ch = interaction.member.voice.channel;
        for(const value of interaction.values)
          {
            if(value === `nc`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
              let data = player.data.get(`night`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.1,
                    pitch : 1.125,
                    rate : 1.05
                }
            });
            player.data.set(`night`,true);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled nightcore mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
        if(data == true){
            player.data.set(`night`,false);
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled Nightcore mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
          }
            }
            if(value === `cf`){
               player.send({guildId : interaction.guild.id,op : 'filters'});
        return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Cleared all the filters mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
          }
            if(value === `cn`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
               let db = player.data.get(`china`);
        if(!db || db === undefined || db === false){
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                timescale : {
                    speed : 0.75,
                    pitch : 1.25,
                    rate : 1.25
                }
            });
            player.data.set(`china`,true);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled China mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
        if(db === true)
        {
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            player.data.set(`china`,false);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled China mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
              }
          }
            if(value === `cm`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
                let data = player.data.get(`chip`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.05,
                    pitch : 1.35,
                    rate : 1.25
                }
            });
            player.data.set(`chip`,true);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled Chipmunk mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
        if(data == true){
            player.data.set(`chip`,false);
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled Chipmunk mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
              }
          }
            if(value === `8d`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
               let data = player.data.get('8d');
        if(!data || data === false || data === undefined){
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                rotation : { rotationHz : 0.2 }
            });
            player.data.set(`8d`,true)
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled 8d mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
        }
        if(data === true){
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                rotation : { rotationHz : null }
            });
            player.data.set(`8d`,false);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled 8d mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
              }
          }
            if(value === `dv`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
                let data = player.data.get(`treble`);
        if(!data || data === false || data === undefined)
        {
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                equalizer: [
                    { band: 0, gain: 0.6 },
                    { band: 1, gain: 0.67 },
                    { band: 2, gain: 0.67 },
                    { band: 3, gain: 0 },
                    { band: 4, gain: -0.5 },
                    { band: 5, gain: 0.15 },
                    { band: 6, gain: -0.45 },
                    { band: 7, gain: 0.23 },
                    { band: 8, gain: 0.35 },
                    { band: 9, gain: 0.45 },
                    { band: 10, gain: 0.55 },
                    { band: 11, gain: 0.6 },
                    { band: 12, gain: 0.55 },
                    { band: 13, gain: 0 },
                ]
            });
            player.data.set(`treble`,true);
            return interaction.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled TrebleBass mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
        }
        if(data === true)
        {
            player.data.set(`treble`,false);
            player.send({
                guildId : interaction.guild.id,
                op : 'filters'
            });
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled TrebleBass mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
        }
              }
          }
            if(value === `dt`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
                let data = player.data.get(`vapor`);
        if(!data || data === false || data === undefined)
        {
            player.send({
                op: 'filters',
                guildId: interaction.guild.id,
                equalizer: [
                    { band: 0, gain: 0 },
                    { band: 1, gain: 0 },
                    { band: 2, gain: 0 },
                    { band: 3, gain: 0 },
                    { band: 4, gain: 0 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: 0 },
                    { band: 7, gain: 0 },
                    { band: 8, gain: 0.15 },
                    { band: 9, gain: 0.15 },
                    { band: 10, gain: 0.15 },
                    { band: 11, gain: 0.15 },
                    { band: 12, gain: 0.15 },
                    { band: 13, gain: 0.15 },
                ],
                timescale: {
                    pitch: 0.55,
                },
            });
            player.data.set(`vapor`,true);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled Vaporwave of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
        if(data === true)
        {
            player.send({guildId : interaction.guild.id , op : 'filters'});
            player.data.set(`vapor`,false);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled Vaporwave of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
        }
              }
          }
            if(value === `bb`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
               let db = player.data.get(`bass`);
            if(!db || db === false || db === undefined)
            {
                player.send({
                    op : 'filters',
                    guildId : interaction.guild.id,
                    equalizer: [
                        { band: 0, gain: 0.10 },
                        { band: 1, gain: 0.10 },
                        { band: 2, gain: 0.05 },
                        { band: 3, gain: 0.05 },
                        { band: 4, gain: -0.05 },
                        { band: 5, gain: -0.05 },
                        { band: 6, gain: 0 },
                        { band: 7, gain: -0.05 },
                        { band: 8, gain: -0.05 },
                        { band: 9, gain: 0 },
                        { band: 10, gain: 0.05 },
                        { band: 11, gain: 0.05 },
                        { band: 12, gain: 0.10 },
                        { band: 13, gain: 0.10 },
                    ]
                });
                player.data.set(`bass`,true);
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled BassBoost mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
            }
            if(db === true)
            {
                player.send({
                    op : 'filters',
                    guildId : interaction.guild.id,
                });
                player.data.set(`bass`,false);
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled BassBoost mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
            } } } 
            if(value === `tm`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
               let db = player.data.get(`trem`);
       if(!db || db === false || db === undefined)
       {
            player.send({
                guildId : interaction.guild.id,
                op : 'filters',
                tremolo : {
                    frequency: 4.0,
                    depth: 0.75
                }
            });
            player.data.set(`trem`,true);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled tremolo mode of the player`,iconURL : interaction.author.displayAvatarURL({dynamic : true})})], ephemeral: true });
       }
       if(db === true)
       {
            player.send({
                guildId : interaction.guild.id,
                op : 'filters'
            });
            player.data.set(`trem`,false);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled tremolo mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
       }
              }
          }
            if(value === `sm`){
        let voted = await vote.hasVoted(interaction.member.id);
      if(!voted && !this.client.config.owners.includes(interaction.member.id)){
          return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
      }
        if (!voted) {
         let db = player.data.get(`slow`);
      if(!db || db === false || db === undefined)
      {
      player.send({
        guildId : interaction.guild.id,
        op : 'filters',
        timescale : {
            speed : 0.5,
            pitch : 1.0,
            rate : 0.8
        }
      });
      player.data.set(`slow`,true);
      return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled Slowmode mode of the player`,iconURL : interaction.author.displayAvatarURL({dynamic : true})})], ephemeral: true });
      }
      if(db === true)
      {
      player.send({
        guildId : interaction.guild.id,
        op : 'filters',
        timescale : {
            speed : 1.0,
            pitch : 1.0,
            rate : 1.0
        }
      });
      player.data.set(`slow`,false);
      return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled Slowmode of the Player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true });
      }
        }
      }
            if(value === `vr`){
              let voted = await vote.hasVoted(interaction.member.id);
            if(!voted && !this.client.config.owners.includes(interaction.member.id)){
                return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))], ephemeral: true })
            }
              if (!voted) {
               let db = player.data.get(`vib`);
        if(!db || db === false || db === undefined)
        {
            player.send({
                op: 'filters',
                guildId: interaction.guild.id,
                vibrato : {
                    frequency: 4.0,
                    depth: 0.75
                }
            });
            player.data.set(`vib`,true);
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Enabled Vibrato mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
        }
        if(db === true)
        {
            player.send({guildId : interaction.guild.id, op : 'filters'});
            return interaction.reply({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Disabled Vibrato mode of the player`,iconURL : "https://images-ext-1.discordapp.net/external/BQPTsXwMBk3aK6YEsjtXquRdB43uX6tFyVpk4zFJEog/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/102782869782.webp?width=607&height=607"})], ephemeral: true })
        }
              }
          }
          }
    }

}
}
module.exports = AvonInteractions;