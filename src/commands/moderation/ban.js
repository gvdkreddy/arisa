const { EmbedBuilder, PermissionsBitField, MessageEmbed } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Ban extends AvonCommand{

    get name(){

        return 'ban';

    }

    get cat(){

        return 'mod'

    }

    async run (client,message,args,prefix) {

    

try{

    if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !client.config.owners.includes(message.author.id)){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.cross} | You are lacking permissions : Ban Members`)]})

        }

        if(!args[0])

        {

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}ban <user> [reason]\``).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please prove me a valid user.`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        let reason = args.slice(1).join(' ');

        if(!reason) reason = `No Reason given`;

        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You can't **Ban** Server Owner.`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        

        if(user.id == message.member.id) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You cannot **Ban** Yourself.`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(!user.bannable) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't **ban** that user.Please check my role position and permissions.`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        message.guild.members.ban(user.id,{reason : `${message.author.id} | ${reason}`}).catch((err) => {

            message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't **Ban** that user.Please check my role position and permissions.`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        });

        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | SuccessFully **Banned** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

    }catch(err) {

            message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't **Ban** that user.Please check my role position and permissions.`).setAuthor({name : `Ban` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

}}}

module.exports = Ban;