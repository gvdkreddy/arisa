const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder, AttachmentBuilder } = require(`discord.js`);
const axios = require("axios");
const ArisaCommand = require("../../structures/avonCommand");
const canvafy = require("canvafy");
const moment = require("moment");
class gay extends ArisaCommand {

    get name(){

        return 'gay'

    }

    get cat(){

        return 'img'

    }

    async run(client,message,args,prefix){
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
    if (!member) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Gayrate`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}gayrate <@user>\``).setTimestamp()]})
    }
    if (member.id === client.user.id) {
     return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Gayrate`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | You Can't Rate My Gayness`).setTimestamp()]})
    }
        
        if (!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Gayrate`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}gayrate <@user>\``).setTimestamp()]})

    
        }
        
        let number = Math.floor(Math.random() * 100);
    
    const kisscard = await canvafy.Image.gay(member.displayAvatarURL({ dynamic: false, size: 1024 }));
   
   const em = new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Gayrate`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${member} is ${number}% Gay 🌈`).setTimestamp().setImage("attachment://gayrate.png");
   
       

    const attachment = new AttachmentBuilder(kisscard, { name: `gayrate.png` });
    
    return message.channel.send({files : [attachment], embeds : [em]});
    }
}
module.exports = gay;

