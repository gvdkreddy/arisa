const Arisa = require('../../structures/avonCommand');
const BotChannelsModel = require('../../models/BotChannels');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

class BotChannelCommand extends Arisa {
    get name() {
        return 'textchannel';
    }
    get aliases(){
        return ['botchannel','txtchannel','botchnl','txtchnl','whitelistchannel']
    }
    get cat() {
        return 'set';
    }

    async run(client, message, args, prefix) {
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && !client.config.owners.includes(message.author.id)){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| You are lacking permissions : Manage Guild` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
        }
        const action = args[0];
          if(!args[0]){
           return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).addFields([
                { name: `<:join_kastro:1064433481641377802>  __For Adding Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel add <#channel>\``, inline: true },
                { name: `<:leave_kastro:1064433478143320094> __For Remove Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel remove <#channel>\``, inline: true },
                ]).addFields([
                { name: `<:reason:1069993657085735042> __For List Of Channel's__`, value: `<:white_arrow:1172534680600457317> \`+textchannel list \``, inline: true },
                { name: `<:delete_kastro:1064440910554869832>  __For Resetting Channel's__`, value: `<:white_arrow:1172534680600457317> \`+textchannel reset \``, inline: true },
                ]).setAuthor({name : `| Wrong Usage` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
        }
        const channel = message.mentions.channels.first();

        if (!action) {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).addFields([
                { name: `<:join_kastro:1064433481641377802>  __For Adding Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel add <#channel>\``, inline: true },
                { name: `<:leave_kastro:1064433478143320094> __For Remove Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel remove <#channel>\``, inline: true },
                ]).addFields([
                { name: `<:reason:1069993657085735042> __For List Of Channel's__`, value: `<:white_arrow:1172534680600457317> \`+textchannel list \``, inline: true },
                { name: `<:delete_kastro:1064440910554869832>  __For Resetting Channel's__`, value: `<:white_arrow:1172534680600457317> \`+textchannel reset \``, inline: true },
                ]).setAuthor({name : `| Wrong Usage` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
        }

        let botChannelsData = await BotChannelsModel.findOne({ guildId: message.guild.id }) || new BotChannelsModel({ guildId: message.guild.id });
        let botChannels = botChannelsData.botChannels || [];

        if (action === 'add') {
            if (!channel) {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).addFields([
                { name: `<:text:1069990580546977793> __For Adding Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel add <#channel>\``, inline: true },
                ]).setAuthor({name : `| Wrong Usage` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
        }
            if (!botChannels.includes(channel.id)) {
                botChannels.push(channel.id);
                botChannelsData.botChannels = botChannels;
                await botChannelsData.save();
                return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Added It To Text Channels.` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
            } else {
                return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| It Is Already A Text Channel.` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
            }
        }  if (action === 'list') {
    if (botChannels.length === 0) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(this.client.config.color).setAuthor({ name: '| There Are No Text Channels', iconURL: this.client.user.displayAvatarURL({ dynamic: true }) })] });
    }

    const channelMentions = botChannels.map(channelId => `<a:zap_:1068187530958213181> \`::\` <#${channelId}>`).join('\n');
    return message.channel.send({ embeds: [new EmbedBuilder().setColor(this.client.config.color).setAuthor({ name: '| Text Channels Of This Guild', iconURL: this.client.user.displayAvatarURL({ dynamic: true }) }).setDescription(`${channelMentions}`)] });
} 
        if (action === 'reset') {
             let pranju = await BotChannelsModel.findOne({ guildId: message.guild.id }) || new BotChannelsModel({ guildId: message.guild.id });
            pranju.delete();
            message.channel.send({ embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`**${client.emoji.tick} | Successfully Deleted All Channels from TextChannel Data**`)] })
            }
        if (action === 'remove') {
    if (!channel) {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).addFields([
                
                { name: `<:text:1069990580546977793> __For Remove Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel remove <#channel>\``, inline: true },
                ]).setAuthor({name : `| Wrong Usage` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
        }
            if (botChannels.includes(channel.id)) {
                botChannels = botChannels.filter((ch) => ch !== channel.id);
                botChannelsData.botChannels = botChannels;
                await botChannelsData.save();
                return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| Removed It From Text Channels.` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
            } else {
                return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| It's Not A Text Channel.` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
            }
        } else {
            return
            message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).addFields([

                { name: `<:join_kastro:1064433481641377802>  __For Adding Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel add <#channel>\``, inline: true },
                { name: `<:leave_kastro:1064433478143320094> __For Remove Channel__`, value: `<:white_arrow:1172534680600457317> \`+textchannel remove <#channel>\``, inline: true },
                ]).addFields([
                { name: `<:reason:1069993657085735042> __For List Of Channel's__`, value: `<:white_arrow:1172534680600457317> \`+textchannel list \``, inline: true },
                { name: `<:delete_kastro:1064440910554869832>  __For Resetting Channel's__`, value: `<:white_arrow:1172534680600457317> \`+textchannel reset \``, inline: true },
                ]).setAuthor({name : `| Wrong Usage` , iconURL : this.client.user.displayAvatarURL({dynamic : true})})]});
        }
    }
}

module.exports = BotChannelCommand;
