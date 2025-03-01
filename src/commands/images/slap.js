const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder, AttachmentBuilder } = require(`discord.js`);
const axios = require("axios");
const ArisaCommand = require("../../structures/avonCommand");
const canvafy = require("canvafy");
const moment = require("moment");
class slap extends ArisaCommand {

    get name(){

        return 'slap'

    }

    get aliases(){

        return ['chata']

    }

    get cat(){

        return 'img'

    }

    async run(client,message,args,prefix){
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
    if (!member) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Slap`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}slap <@user>\``).setTimestamp()]})
    }
    if (member.id === client.user.id) {
     return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Slap`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | You Can't Slap Me`).setTimestamp()]})
    }
        
        if (!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name: `Slap`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}slap <@user>\``).setTimestamp()]})

    
        }
        
    
    const kisscard = await canvafy.Image.batslap(message.author.displayAvatarURL({dynamic : false, size : 1024}), member.displayAvatarURL({ dynamic: false, size: 1024 }));
   
   const em = new EmbedBuilder().setColor(client.config.color).setAuthor({name: `| Slap`, iconURL: client.user.displayAvatarURL()}).setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic : true})}).setDescription(`${message.author}  👋 ${member}`).setTimestamp().setImage("attachment://slapped.png");
   
       

    const attachment = new AttachmentBuilder(kisscard, { name: `slapped.png` });
    
    return message.channel.send({files : [attachment], embeds : [em]});
    }
}
module.exports = slap;

