const { EmbedBuilder, PermissionsBitField } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Hide extends AvonCommand{

    get name(){

        return 'hide';

    }

    get cat(){

        return 'mod'

    }

    async run (client,message,args,prefix) {
         

        let ch = message.guild.channels.cache.get(args[0]) || message.channel || message.mentions.channels.first();

        let ro = message.guild.id;

        
            
            if(!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && !client.config.owners.includes(message.author.id)){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Hide` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.cross} | You are lacking permissions : Manage Channels`)]})

        }
            
            

        ch.permissionOverwrites.edit(message.guild.id,{ViewChannel : false}).then(x => {

        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | SuccessFully **Hided** ${ch}`).setAuthor({name : `Hide` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]}); }).catch((err) => { message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I am missing adequate permissions.Please check my permissions.`).setAuthor({name : `Hide` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})}) 

}
    }
module.exports = Hide;