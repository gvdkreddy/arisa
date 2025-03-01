const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Vote extends AvonCommand{
    get name(){
        return 'vote'
    }
    get aliases(){
        return ['vot']
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        let em = new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.info} | **[Click Here To Vote Me](https://top.gg/bot/1027828697828433980/vote)**`);
        let row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://top.gg/bot/1027828697828433980/vote`).setLabel(`Vote`)
        );
        return message.channel.send({embeds : [em] , components : [row]});
    }
}
module.exports = Vote;