const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand")
const db = require("../../models/dj");
const lodash = require("lodash");
class Dj extends AvonCommand{
    get name(){
        return 'dj';
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'set'
    }
    async run(client,message,args,prefix,player){
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && !client.config.owners.includes(message.author.id)){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You are lacking permissions : Manage Guild`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        const action = args[0];
        if(!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().addFields([

                { name: `<:join_kastro:1064433481641377802>  __For Adding DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj add <@role>\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For Removing DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj remove <@role>\``, inline: true }, 
                { name: `<:Icons_utility:1069995603381211146> __For Toggle of DJ Mode__`, value: `<:white_arrow:1172534680600457317> \`+dj toggle\``, inline: true },
                ]).addFields([
                { name: `<:reason:1069993657085735042> __For List Of DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj list \``, inline: true },
                { name: `<:delete_kastro:1064440910554869832>  __For Resetting DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj reset \``, inline: true },
                
                ]).setAuthor({

                name: `| Wrong Usage`,

                iconURL: message.guild.iconURL(),

            }).setFooter({

                text: `Requested by ${message.author.tag}`,

                iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true }),

            })

            .setTimestamp().setColor(client.config.color)]})
        }
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
         let data = await db.findOne({ Guild: message.guild.id });
        
         if (!action){
             return message.channel.send({ embeds : [new EmbedBuilder().addFields([

                { name: `<:join_kastro:1064433481641377802>  __For Adding DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj add <@role>\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For Removing DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj remove <@role>\``, inline: true }, 
                { name: `<:Icons_utility:1069995603381211146> __For Toggle of DJ Mode__`, value: `<:white_arrow:1172534680600457317> \`+dj toggle\``, inline: true },
                ]).addFields([
                { name: `<:reason:1069993657085735042> __For List Of DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj list \``, inline: true },
                { name: `<:delete_kastro:1064440910554869832>  __For Resetting DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj reset \``, inline: true },
                
                ]).setAuthor({

                name: `| Wrong Usage`,

                iconURL: message.guild.iconURL(),

            }).setFooter({

                text: `Requested by ${message.author.tag}`,

                iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true }),

            })

            .setTimestamp().setColor(client.config.color)]
         })}
         if ( action === 'add' || action == 'set'){
       
        if (!role) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please mention a role @Role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        
        if (!data || data.Roles.length < 0) {
           data = new db({
                Guild: message.guild.id,
                Roles: [role.id],
                Mode: true
            })
            await data.save();
            return await message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Successfully added ${role} in DJ Role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        } 
             if (data.Roles.length >= 5) return message.channel.send({ embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Can't add More than 5 Roles`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()] });
             if (data || data.Roles.length > 0){
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Role already exists in Dj Role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
            data.Roles.push(role.id);
            await data.save();
            return await message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Successfully added new Role ${role} in Dj`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }
    }
    if ( action === 'reset'){
        if (data) {
            await data.delete()
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Successfully resetted roles in Dj`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        } else return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Don't have dj setup in this guild`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
    }
    if ( action === 'toggle'){      
        if(!data) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Don't have dj setup in this Server`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        let mode = false;
        if(!data.Mode)mode = true;
        data.Mode = mode;
        await data.save();
        if(mode) {
            await message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Successfully Enabled DJ Role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        } else {
           return await message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Successfully Disabled DJ Role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
    }
        if ( action === "list" || action === "config" ) {
            let soham = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Dj`, iconURL : message.guild.iconURL({dynamic: true})}).setTimestamp().setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setTitle(`${message.guild.name}'s Dj role list`);
  if(!data || !data.Roles.length)
                    {
        soham.setDescription(`- No Roles are on Dj`)   
                        message.channel.send({embeds: [soham]})
                    }
             if (data || data.Roles.length)
                 {
                let list = data.Roles.map((x, i) => `- ${++i}・<@&${x}>`) 
                    const pages = lodash.chunk(list, 5).map((x) => x.join("\n"));
            let page = 0;
            let List = list.length;
                soham.setDescription(`${pages[page]}\n\n${client.emoji.music} Mode : ${data.Mode ? `${client.emoji.tick} Enabled` : `${client.emoji.cross} Disabled`}`)
   message.channel.send({embeds : [soham]})
                    }
            } if (action === 'remove' || action === 'delete') {
            if (!role) return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please mention a role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()] });

            if (!data || !data.Roles || data.Roles.length === 0) {
                return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No DJ Roles Not Found`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()] });
            }

            const roleIndex = data.Roles.indexOf(role.id);

            if (roleIndex !== -1) {
                data.Roles.splice(roleIndex, 1);
                await data.save();
                return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Successfully added ${role} in DJ Role`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()] });
            } else {
                return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No DJ Roles Not Found`).setAuthor({name : `Dj` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()] });
            }
        } else {
            return
            message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).addFields([

                { name: `<:join_kastro:1064433481641377802>  __For Adding DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj add <@role>\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For Removing DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj remove <@role>\``, inline: true }, 
                { name: `<:Icons_utility:1069995603381211146> __For Toggle of DJ Mode__`, value: `<:white_arrow:1172534680600457317> \`+dj toggle\``, inline: true },
                ]).addFields([
                { name: `<:reason:1069993657085735042> __For List Of DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj list \``, inline: true },
                { name: `<:delete_kastro:1064440910554869832>  __For Resetting DJ Role's__`, value: `<:white_arrow:1172534680600457317> \`+dj reset \``, inline: true },
                ]).setAuthor({name : `| Wrong Usage` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
        }
    } 
}
module.exports = Dj;