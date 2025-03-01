const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class rate extends AvonCommand{
    get name(){
        return 'rate'
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
        let db = player.data.get(`rate`);
        if(!db || db === undefined || db === false){
            player.send({
                guildId : message.guild.id,
                op : 'filters',
                timescale : {
                    rate: 2,
                }
            });
            player.data.set(`rate`,true);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enabled Rate Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        if(db === rate)
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
            player.data.set(`rate`,false);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Disabled Rate Filter of the Player`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
    }
}
module.exports = rate;