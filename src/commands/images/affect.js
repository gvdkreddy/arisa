const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require("discord.js");
const canvafy = require("canvafy");
const ArisaCommand = require("../../structures/avonCommand");
class affect extends ArisaCommand {
    get name(){
        return 'affect'
    }
    get cat(){
        return 'img'
    }

    async run(client,message,args,prefix){
         if (!args[0]) {
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Wrong Command Usage : \n \`\`\`${prefix}affect <@fickling> \`\`\``).setAuthor({name : `Nirlakshan` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
            }
    let member = message.mentions.members.first().user;
        
   if(!member)return message.reply({content: "> **You Serious.?**",embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Wrong Command Usage : \n \`\`\`${prefix}affect <@fickling> \`\`\``).setAuthor({name : `Nirlakshan` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        
    let ok = await canvafy.Image.affect(member.displayAvatarURL({ forceStatic: true, extension: "png" }));


    message.reply({
      files: [{
        attachment: ok,
        name: `ajju.png`
      }]
    });
   }

}

module.exports = affect;