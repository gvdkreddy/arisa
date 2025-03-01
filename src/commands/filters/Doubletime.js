const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class doubletime extends AvonCommand{
    get name(){
        return 'doubletime'
    }
    get aliases(){
        return null;
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
        return 'filters'
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        let db = player.data.get(`dt`);
        if(!db || db === undefined || db === false){
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                     speed: 1.165,
                }
            });
            player.data.set(`dt`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Doubletime Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(db === dt)
        {
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    speed : 1.0,
                    pitch : 1.0,
                    rate : 1.0
                }
            });
            player.data.set(`dt`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Doubletime of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = doubletime;