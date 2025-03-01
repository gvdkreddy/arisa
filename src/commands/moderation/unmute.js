const { EmbedBuilder, PermissionsBitField, MessageEmbed } = require("discord.js");

const ms = require(`ms`);

const AvonCommand = require("../../structures/avonCommand");

class Unmute extends AvonCommand{

    get name(){

        return 'unmute';

    }

    get aliases(){

        return ['untimeout']

    }

    get cat(){

        return 'mod'

    }

    async run (client,message,args,prefix) {

    try{

    if(!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers) && !client.config.owners.includes(message.author.id)){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.cross} | You are lacking permissions : Timeout Members`)]})

        }

        if(!args[0])

        {

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}unmute <user> [reason]\``).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user.`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        
        let dur = ms(`1second`);

        let reason = args.slice(1).join(' ');

        if(!reason) reason = 'No Reason given';

        if(user.id === client.user.id) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I cannot unmute myself.`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});

        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You can't even mute Server Owner and thinking of unmuting him ?`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        

        if(!user.isCommunicationDisabled()) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't unmute that user.That user is not timed out.`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        if(!user.manageable) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't unmute that user.Please check my role position and permissions.`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        user.timeout(dur,`${message.author.tag} | ${reason}`);

        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | SuccessFully **Unmuted** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});

    }catch(e){message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I can't unmute that user.Please check my role position and permissions.`).setAuthor({name : `Unmute` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})}

}

}

module.exports = Unmute;