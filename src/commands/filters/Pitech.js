const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require("discord.js");

class Pitch extends AvonCommand{
    get name(){
        return 'pitch';
    }
    get vote(){
        return true;
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get cat(){
        return 'filters';
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        let data = player.data.get(`Pitch`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    pitch: 3
                }
            });
            player.data.set(`Pitch`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Pitch Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(data == true){
            player.data.set(`Pitch`,false);
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Pitch Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = Pitch;