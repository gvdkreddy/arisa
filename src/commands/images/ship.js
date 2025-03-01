const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder, AttachmentBuilder } = require(`discord.js`);
const axios = require("axios");
const ArisaCommand = require("../../structures/avonCommand");
const canvafy = require("canvafy");
const moment = require("moment");
class ship extends ArisaCommand {

    get name(){

        return 'ship'

    }

    get aliases(){

        return ['loverate']

    }

    get cat(){

        return 'img'

    }

    async run(client,message,args,prefix){
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
    if (!member) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Ship`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}ship <@user>\``).setTimestamp()]})
    }
    if (member.id === client.user.id) {
     return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Ship`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | You Can't Ship with Me`).setTimestamp()]})
    }
        
        if (!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `| Ship`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}ship <@user>\``).setTimestamp()]})

    
        }
        
    let number = Math.floor(Math.random() * 100);
    let react;
    if (number < 50) {
    react = ":disappointed_relieved: Not Too Good";
    }
    if (number > 50) {
    react = ":relaxed: Average"; 
    }
    if (number > 70 ) {
    react = ":heart_eyes: Amazing";
    }
    if (number === 100) {
    react = ":smiling_face_with_3_hearts: Fantastic!!";
    }
    
    const shipcard = await new canvafy.Ship()

.setAvatars(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }),member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
.setCustomNumber(number)
.setBackground("image", "https://img.freepik.com/free-photo/low-angle-shot-mesmerizing-starry-sky_181624-27925.jpg")
.setBorder("#090000")

.setOverlayOpacity(0.5)
   
   const em = new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Ship`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${message.author} ❤${number}% ${member} ${react}`).setTimestamp().setImage("attachment://loverate.png");
   
       const cardBuffer = await shipcard.build()

    const attachment = new AttachmentBuilder(cardBuffer, { name: `loverate.png` });
    
    return message.channel.send({files : [attachment], embeds : [em]});
    }
}
module.exports = ship;

