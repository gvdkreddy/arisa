const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Skipto extends AvonCommand{
    get name(){
        return 'skipto'
    }
    get aliases(){
        return ['sto','skto','nexto']
    }
    get inVoice(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get sameVoice(){
        return true;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
    if (!player.queue.length) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | There are no songs in Queue`).setAuthor({name : `SkipTo` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});
    }
    if (!args[0] || isNaN(args[0])) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a Valid Number \n \`Ex: 1 | 3 | 7 \``).setAuthor({name : `SkipTo` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]}); }
    if ( Number(args[0]) > player.queue.length ) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please Provide me a Number between ${player.queue.lenght}`).setAuthor({name : `SkipTo` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});
    }
    if ( Number(args[0]) < 1 ) {
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Number must be Greater than 1`).setAuthor({name : `SkipTo` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]}); }
    if ( Number(args[0]) === 1 ) {
    player.skip()
    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.skipbutton} | Skipped The Current Song`).setAuthor({name : `SkipTo` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]}); }
    
       player.queue.remove(0, Number(args[0]) - 1);
       player.data.get('music').delete();
       player.skip();
      return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.skipbutton} | Skipped To Number ${Number(args[0])} Song in Queue`).setAuthor({name : `SkipTo` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});
      }
     }
module.exports = Skipto;