const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ms = require("ms");
const { KazagumoTrack } = require(`kazagumo`);
const moment = require(`moment`);
const AvonCommand = require(`../../structures/avonCommand`);
class Def extends AvonCommand{
    get name(){
        return 'default'
    }
    get aliases(){
        return ['def','df','dp']
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get dj(){
        return true;
    }    
    async run(client,message,args,prefix){
    try{
    if(!message.member.voice.channel){

                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to a voice channel.`).setTimestamp().setAuthor({name : `${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})]}).then(msg => setTimeout(() => msg.delete(), 5000));

            }
            if(!args[0]){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Command Usage ${client.emoji.rightarrow} \`${prefix}def <name/song url>\``).setAuthor({name : `Default` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
            }
            let channel = message.member.voice.channel;
            var player = client.poru.players.get(message.guild.id);
            if(!player){
                player = await client.poru.createPlayer({
                    guildId : message.guild.id,
                    voiceId : channel.id,
                    textId : message.channel.id,
                    deaf : true,
                    volume : 100,
                    shardId : message.guild.shardId
                });
            }

            let query = args.join(" ");
            player.setTextChannel(message.channel.id);
            
                if(query.includes(`youtube`))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I don't resolve youtube links anymore due to Youtube's TOS Violation`).setAuthor({name : `Default` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});
                }
                if(query.includes(`youtu.be`))
                {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | I don't resolve youtube links anymore due to Youtube's TOS Violation`).setAuthor({name : `Default` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]});
                }
              let lol = query;
                          if ( query.startsWith('https://') ){
                              lol = query.replace('https://', '');     
                              } 
        if ( query.startsWith('http://') ){
            lol = query.replace('http://', '')    } 
                         let result = await player.search(lol , {requester : message.author});
                        if(!result.tracks.length)
                        {
                            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Default`,iconURL : message.guild.iconURL()}). setDescription(`${client.emoji.cross} | No results were found`).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()],components : []});
                        }
                        if(result.type === `PLAYLIST`)
                        {
                            for(let track of result.tracks)
                            {
                                player.queue.add(track);
                                if(!player.playing && !player.paused) player.play();
                                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.queue} Added ${result.tracks.length} Songs from [${result.playlistName.substring(0,45)}](${client.config.server}) To Queue`)],components : []});
                            }
                        }
                        else{
                            player.queue.add(result.tracks[0]);
                            if(!player.playing && !player.paused) player.play();
                             return message.channel.send({components : [],embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Added Song to Queue`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.queue} : [${result.tracks[0].title}](${client.config.server}) \n ${client.emoji.users} : ${message.author}`)]});
                        }
                } catch (err) { 
                }
    }
}
module.exports = Def;