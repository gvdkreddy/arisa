const { EmbedBuilder, PermissionsBitField, MessageEmbed } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Kick extends AvonCommand{

    get name(){

        return 'kick';

    }

    get cat(){

        return 'mod'

    }

    async run (client,message,args,prefix) {

        

        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers) && !client.config.owners.includes(message.author.id)){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.cross} | You are lacking permissions : Kick Members`)]})

        }

        

        if(!args[0])

        {

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}kick <user> [reason]\``).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) { return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user.`).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]}) }

        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You can't **Kick** Server Owner.`).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        

        if(user.id === message.member.id) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You can't **Kick** Yourself.`).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(!user.kickable) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't **Kick** that user.Please check my role position and permissions.`).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        let reason = args.slice(1).join(' ');

        if(!reason) reason = `No Reason given`;

        message.guild.members.kick(user.id,{reason : `${message.author.tag} | ${reason}`}).catch((err) => {

            message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't kick that user. Check my role position and permissions.`).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        });

        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | SuccessFully **Kicked** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`).setAuthor({name : `Kick` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

    }

}

module.exports = Kick;