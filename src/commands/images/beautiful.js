const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require("discord.js");
const canvafy = require("canvafy");
const ArisaCommand = require("../../structures/avonCommand");
class beauty extends ArisaCommand {
    get name(){
        return 'beautiful'
    }
    get aliases(){
        return ['beauti', "booti"]
    }
    get cat(){
        return 'img'
    }

    async run(client,message,args,prefix){
    let member = message.mentions.members.first().user || message.author;
        
   if(!member)return message.reply({content: "> **You Serious.?, Got No One To Ship With.?**",embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Wrong Command Usage : \n \`\`\`${prefix}beautiful <@arjun> \`\`\``).setAuthor({name : `Bootiful` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        
    let ok = await canvafy.Image.beautiful(member.displayAvatarURL({ forceStatic: true, extension: "png" }));


    message.reply({
      files: [{
        attachment: ok,
        name: `ajju.png`
      }]
    });
   }

}

module.exports = beauty;