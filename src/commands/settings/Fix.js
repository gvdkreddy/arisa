const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand")

class Fix extends AvonCommand{
    get name(){
        return 'fix';
    }
    get aliases(){
        return ['fix'];
    }
    get cat(){
        return 'set'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){
        return true;
    }
    async run(client,message,args,prefix,player){
        player.destroy();
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| Fixed the player` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
    }
}
module.exports = Fix;