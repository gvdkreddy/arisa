const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require("discord.js");

class Speed extends AvonCommand{
    get name(){
        return 'speed';
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
        let data = player.data.get(`Speed`)
        if(!data || data == false || data == undefined)
        {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed: 1.501,
                    pitch: 1.245,
                    rate: 1.921,
                }
            });
            player.data.set(`Speed`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Speed Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(data == true){
            player.data.set(`Speed`,false);
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Speed Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = Speed;