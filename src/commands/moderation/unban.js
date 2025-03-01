const { EmbedBuilder, PermissionsBitField, MessageEmbed } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Unban extends AvonCommand{

    get name(){

        return 'unban';

    }

    get cat(){

        return 'mod'

    }

    async run (client,message,args,prefix) {

    
try{
    if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !client.config.owners.includes(message.author.id)){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Unban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.cross} | You are lacking permissions : Ban Members`)]})

        }

        if(!args[0])

        {

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}unban <user_id>\``).setAuthor({name : `Unban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        const bans = await message.guild.bans.fetch().catch(() => { });

        let reason = args.slice(1).join(' ');

        if(!reason) reason = `No Reason given`;

        let user = bans.map(x => x.user).find(u => u.id === args[0])

        if(!user){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I couldn't find that member in ban list.`)]}).catch((err) => { message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I am missing adequate permissions.Please check my permissions.`).setAuthor({name : `Unban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})}) 

        }

        message.guild.members.unban(user ? user.id : args[0],`${message.author.tag} | ${reason}`).catch((err) => { message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I am missing adequate permissions.Please check my permissions.`).setAuthor({name : `Unban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})}) 

        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | SuccessFully **Unbanned** ${user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`).setAuthor({name : `Unban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
}catch(e){ message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I am missing adequate permissions.Please check my permissions.`).setAuthor({name : `Unban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})} 
    }

}

module.exports = Unban;