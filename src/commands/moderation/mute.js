const { EmbedBuilder, PermissionsBitField, MessageEmbed } = require("discord.js");

const ms = require(`ms`);

const AvonCommand = require("../../structures/avonCommand");

class Mute extends AvonCommand{

    get name(){

        return 'mute';

    }

    get aliases(){

        return ['timeout']

    }

    get cat(){

        return 'mod'

    }

    async run (client,message,args,prefix) {

    try{

    if(!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers) && !client.config.owners.includes(message.author.id)){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.cross} | You are lacking permissions : Timeout Members`)]})

        }

    

        if(!args[0])

        {

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}mute <user> <time> [reason]\``).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        let reason = args.slice(2).join(' ');

        if(!reason) reason = `No Reason given`;

        let time = args[1];

        if(!time) time = '7days';

        let dur = ms(time);

        if(!dur){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid time.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        if(user.isCommunicationDisabled()) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't mute that user.That user is already muted.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(user.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't mute admins.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(user.id === client.user.id) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't **Mute** myself.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});

        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You can't mute Server Owner.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(user.id === message.member.id) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You cannot **Mute** Yourself.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(!user.manageable) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't mute that user.Please check my role position and permissions.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        user.timeout(dur,`${message.author.tag} | ${reason}`);

        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | SuccessFully **Muted** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});

        }catch(e){ message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't mute that user.Please check my role position and permissions.`).setAuthor({name : `Mute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})}

    }

}

module.exports = Mute;