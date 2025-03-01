const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require("discord.js");

class Darthvader extends AvonCommand{
    get name(){
        return 'darthvader';
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
        let data = player.data.get(`daarr`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed: 0.975,
                    pitch: 0.5,
                    rate: 0.8,
                }
            });
            player.data.set(`daarr`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Darthvader Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(data == true){
            player.data.set(`daarr`,false);
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Darthvader Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = Darthvader;