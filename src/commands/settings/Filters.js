const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
class Settings extends AvonCommand{
    get name(){
        return 'filters';
    }
    
    get cat(){
        return 'set'
    }
    get inVoice(){
        return false;
    }
    get sameVoice(){
        return false;
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        try{
        let em = new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Player Settings` , iconURL : message.guild.iconURL({dynamic : true})}).setThumbnail(client.user.displayAvatarURL()).setDescription(
            `**Connected to :** ${message.guild.members.me.voice.channel ? message.guild.members.me.voice.channel : `\`Not Connected\``}
            **Voice Channel :** ${message.guild.members.me.voice.channel ? `\`${message.guild.members.me.voice.channelId}\`` : `\`Not Connected\``}
            
            __Filter Settings__
            **8D :** ${player.filters._8d ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Bassboost :** ${player.filters.bassboost ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **China :** ${player.filters.china ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Chipmunk :** ${player.filters.chipmunk ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Nightcore :** ${player.filters.nightcore ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Slowmode :** ${player.filters.slowmode ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Tremolo :** ${player.filters.tremolo ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Vaporwave :** ${player.filters.vaporwave ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            **Vibrato :** ${player.filters.vibrato ? `${client.emoji.tick}` : `${client.emoji.cross}`}
            `
        ).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})});
        return message.channel.send({embeds : [em]});
    } catch(e) { console.log(e)}
}
}
module.exports = Settings;