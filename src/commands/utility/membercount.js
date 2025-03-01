const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require(`discord.js`);
const AvonCommand = require("../../structures/avonCommand");

class membercount extends AvonCommand {
    get name(){
        return 'membercount'
    }
    get aliases(){
        return 'mc'
    }
    get cat(){
        return 'utility'
    }
    async run(client,message,args,prefix){
      let em = new EmbedBuilder().setAuthor({name : `Total Members - \`${message.guild.memberCount}\``}).setColor(client.config.color);
        return message.channel.send({embeds : [em]});
       
    }
}
module.exports = membercount;