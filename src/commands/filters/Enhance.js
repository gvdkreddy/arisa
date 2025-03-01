const AvonCommand = require("../../structures/avonCommand");
const { EmbedBuilder } = require(`discord.js`);
class Enhance extends AvonCommand{
    get name(){
        return 'enhance'
    }
    get aliases(){
        return ['mast'];
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    get vote(){
        return true;
    }
    get cat(){
        return 'filters'
    }
    get player(){
        return true;
    }
    async run(client,message,args,prefix,player){
        try{
            await player.setVolume(65 / 1);
            let db = player.data.get(`enhance`);
            if(!db || db === false || db === undefined)
            {
                player.send({
                    op : 'filters',
                    guildId : message.guild.id,
                    equalizer: [
                        { band: 0, gain: 0.05 * 0.5 },
                        { band: 1, gain: 0.06 * 0.5 },
        { band: 2, gain: 0.12 * 0.5 },
        { band: 3, gain: 0.02 * 0.5 },
        { band: 4, gain: 0.125 * 0.5 },
        { band: 5, gain: 0.025 * 0.5 },
        { band: 6, gain: -0.05 * 0.5 },
        { band: 7, gain: -0.1 * 0.5 },
        { band: 8, gain: -0.05 * 0.5 },
        { band: 9, gain: 0.02 * 0.5 },
        { band: 10, gain: 0.01 * 0.5 },
        { band: 11, gain: 0.065 * 0.5 },
        { band: 12, gain: 0.1 * 0.5 },
        { band: 13, gain: 0.14 * 0.5 },
        { band: 14, gain: 0.08 * 0.5 },
                    ]
                });
                player.data.set(`enhance`,true);
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Enhanced Your Music`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
            if(db === true)
            {
                player.send({
                    op : 'filters',
                    guildId : message.guild.id,
                });
                player.data.set(`enhance`,false);
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Back To Normal Mode`,iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }
        }
        catch(e){
            console.log(e)
        }
    }
}
module.exports = Enhance;