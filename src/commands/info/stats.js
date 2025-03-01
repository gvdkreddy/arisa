const AvonCommand = require("../../structures/avonCommand");
const moment = require(`moment`);
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, version } = require(`discord.js`);
class stats extends AvonCommand {
    get name() {
        return 'stats'
    }
    get aliases() {
        return ['st', 'bi']
    }
    get cat() {
        return 'info'
    }
    async run(client,message,args,prefix,guild){
        try{
         let uptime = moment.duration(message.client.uptime).format(`D [days], H [hrs], m [mins], s [secs]`);
           
        let em = new EmbedBuilder().setColor(client.config.color)
        .setAuthor({ name: `| ${client.user.username}'s General Info`, iconURL: client.user.displayAvatarURL() })
        .addFields([
                  {
                      name: `__<a:bot:1147805116297125959> Bot's Name__`,
                      value: `<:white_arrow:1172534680600457317> Arisa#2245`,

                  },
                  {
                      name: `__<a:search:1158311186299887676> Bot's Id__`,
                      value: `<:white_arrow:1172534680600457317> ${this.client.user.id}`,
                      
                  },
                  
                  {
                      name: `__<a:latency_kastro:1064407283439763486> Latency__`,
                      value: `<:white_arrow:1172534680600457317> ${Math.round(this.client.ws.ping)} ms`,
                  },
                    {
                        name: `__<a:zap_:1068187530958213181> Total Server's__`,
                        value: `<:white_arrow:1172534680600457317> ${client.guilds.cache.size}`,
                        
                    },
                      {
                          name: `__<a:Users:1157957175080140811> Total User's__`,
                          value: `<:white_arrow:1172534680600457317> ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}+`,
                          
                      },
                        
                  {
                      name: `__<a:reset:1151422247307849748> Uptime__`,
                      value: `<:white_arrow:1172534680600457317> ${uptime}`,

                  },
                              
                  
            ]).setThumbnail(client.user.displayAvatarURL()).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp();

        let b1 = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId(`m1`).setLabel(`General Info`);
        let b2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId(`m2`).setLabel(`System Info`);
        let b3 = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId(`m3`).setLabel(`Team Info`);
        let b4 = new ButtonBuilder().setCustomId(`m1`).setLabel(`General Info`).setStyle(ButtonStyle.Secondary).setDisabled(true);
        let b5 = new ButtonBuilder().setCustomId(`m2`).setLabel(`System Info`).setStyle(ButtonStyle.Secondary).setDisabled(true);
        let b6 = new ButtonBuilder().setCustomId(`m3`).setLabel(`Team Info`).setStyle(ButtonStyle.Secondary).setDisabled(true);
        let ro = new ActionRowBuilder().addComponents(b1,b2,b3);
              let ro2 = new ActionRowBuilder().addComponents(b4,b5,b6);
            let rotest = new ActionRowBuilder().addComponents(b4,b2,b3)
        let em1 = new EmbedBuilder().setColor(client.config.color)
                .setAuthor({ name: `| ${client.user.username}'s General Info`, iconURL: client.user.displayAvatarURL() })
        .addFields([
                  {
                      name: `__<a:bot:1147805116297125959> Bot's Name__`,
                      value: `<:white_arrow:1172534680600457317> Arisa#2245`,

                  },
                  {
                      name: `__<a:search:1158311186299887676> Bot's Id__`,
                      value: `<:white_arrow:1172534680600457317> ${this.client.user.id}`,
                      
                  },
                  
                  {
                      name: `__<a:latency_kastro:1064407283439763486> Latency__`,
                      value: `<:white_arrow:1172534680600457317> ${Math.round(this.client.ws.ping)} ms`,
                  },
                    {
                        name: `__<a:zap_:1068187530958213181> Total Server's__`,
                        value: `<:white_arrow:1172534680600457317> ${client.guilds.cache.size}`,
                        
                    },
                      {
                          name: `__<a:Users:1157957175080140811> Total User's__`,
                          value: `<:white_arrow:1172534680600457317> ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}+`,
                          
                      },
                        
                  {
                      name: `__<a:reset:1151422247307849748> Uptime__`,
                      value: `<:white_arrow:1172534680600457317> ${uptime}`,

                  },
                              
                  
            ])
                .setThumbnail(client.user.displayAvatarURL()).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp();

        let em2 = new EmbedBuilder().setAuthor({ name: `| ${client.user.username}'s System Info`, iconURL: client.user.displayAvatarURL() })
        .setColor(client.config.color)
         .addFields([
                                    {
                                        name: `<:warn:1094230373560500265> __Cpu's Model__`,
                                        value: `<:white_arrow:1172534680600457317>  Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz`,
                                    },
                                      {
                                        name: `<:Enable_kastro:1064433434396733460> __Cpu Core's__`,
                                        value: `<:white_arrow:1172534680600457317> 12`,
                                      },
                                      {
                                        name: `<:ram:1157956752977969182> __Memory Usage__`,
                                        value: `<:white_arrow:1172534680600457317> 363/6144 MB`,
                                      },
                                      {
                                        name: `<:controller:1096861116027646074> __Cpu Usage__`,
                                        value: `<:white_arrow:1172534680600457317> 6.9%/100%`,
                                      },{
                                        name: `<:dev_kastro:1064440907723702323> __DJS Version__`,
                                        value: `<:white_arrow:1172534680600457317> 14.7.1`
                                      },
                                      {
                                        name: `<:Icons_utility:1069995603381211146> __Platform__`,
                                        value: `<:white_arrow:1172534680600457317> Linux`,
                                      },
                                      {
                                        name: `<:nodeJS:1157955938322481162> __NodeJS Version__`,
                                        value: `<:white_arrow:1172534680600457317> v20.1.0`,
                                      },
                                      
                                    
                                ])
        .setThumbnail(client.user.displayAvatarURL()).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp();

        let em3 = new EmbedBuilder().setAuthor({ name: `| ${client.user.username}'s Team Info`, iconURL: client.user.displayAvatarURL() })
            .setColor(client.config.color)
            .addFields([
                                      {
                                        name: `__About Team Kronix__`,
                                        value: `*Team Kronix is An Optimistic Community of Developers, Based Around iShowKronix on Youtube!, Endeavouring to Learn as we Grow.*`,
                                      },
                                      
                                    {
                                        name: `<a:Developer:1194195281324015687> __Developing Team__`,
                                        value: `**<a:reddot_:1068187517528068126> [~ A R J U N](https://discordapp.com/users/1057674644905279498) \n<a:reddot_:1068187517528068126> [~ A K S H A T](https://discordapp.com/users/924144335535091744)**`,
                                      inline: true
                                    },
                                      {
                                          name: `<a:Developer:1194195281324015687> __Contact Us__`,
                                          value: `**<a:reddot_:1068187517528068126> [iShowKronix's YouTube](https://youtube.com/@kronixx2077)\n<a:reddot_:1068187517528068126> [iShowKronix Discord](https://discord.gg/aMC2e8zgQb)**`, 
                                          inline: true
                                      },
                                      
                                    
                                ])
            .setThumbnail(client.user.displayAvatarURL()).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp();

        let msg = await message.channel.send({embeds : [em],components : [rotest]});
        let call = await msg.createMessageComponentCollector({
            filter:(int) =>{
                if(int.user.id === message.author.id) return true;
                else{
                    return int.reply({content : `${client.emoji.cross} | This is not your session run ${prefix}stats instead.`,ephemeral : true})
                }
            },
            time : 50000,
        });
        call.on('collect', async (int) => {
            if (int.isButton()) {
                if (int.customId === `m1`) {
                    b1.setStyle(ButtonStyle.Secondary).setDisabled(true); 
                    b2.setStyle(ButtonStyle.Success).setDisabled(false); 
                    b3.setStyle(ButtonStyle.Success).setDisabled(false);
                    return int.update({ embeds: [em1], components: [ro] });
                }
                if (int.customId === `m2`) {
                    b1.setStyle(ButtonStyle.Success).setDisabled(false);
                    b2.setStyle(ButtonStyle.Secondary).setDisabled(true); 
                    b3.setStyle(ButtonStyle.Success).setDisabled(false);
                    return int.update({ embeds: [em2], components: [ro] });
                }
                if (int.customId === `m3`) {
                    b1.setStyle(ButtonStyle.Success).setDisabled(false);
                    b2.setStyle(ButtonStyle.Success).setDisabled(false);
                    b3.setStyle(ButtonStyle.Secondary).setDisabled(true);
                    return int.update({ embeds: [em3], components: [ro] });
                }
            }
        });
            call.on('end',async() => {

            if(!msg) return;

            msg.edit({components : [ro2]})

        });
    } catch(e) {  }
} 
}
module.exports = stats;
