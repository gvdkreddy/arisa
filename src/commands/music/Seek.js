const { EmbedBuilder } = require("discord.js");
const ms = require('ms');
const moment= require('moment');
const AvonCommand = require("../../structures/avonCommand");

class Seek extends AvonCommand{
    get name(){
        return 'seek'
    }
    get aliases(){
        return ['']
    }
    get cat(){
        return 'music'
    }
    get player(){
        return true;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        if(!args[0])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}seek <1min|1hr|30s>\``).setAuthor({name : `Seek` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        if(!player.queue.current.isSeekable){
            return message.channel.send({embeds : [new EmbedBuilder().setDescription(`${client.emoji.cross} | The Track is not Seekable`).setAuthor({name : `Seek` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setColor(client.config.color)]})
        }
        try{
        player.seek(ms(args.join(' ')));
            let time = ms(args.join(' '));
            let position = player.position;
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${time < position ? `${client.emoji.rewindbutton}` : `${client.emoji.forwardbutton}`} | Seeked the track ${moment.duration(ms(args.join(' '))).format("h[h] m[m] s[s]")}`).setAuthor({name : `Seek` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
            } catch(e) {
                
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Provide me a valid Time \`Eg: 10s | 50s | 1h\``).setAuthor({name : `Seek` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
                
            }
    }
}
module.exports = Seek;