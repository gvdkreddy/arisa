const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require(`discord.js`);
const AvonCommand = require("../../structures/avonCommand");

class say extends AvonCommand {
    get name(){
        return 'say'
    }
    get cat(){
        return 'utility'
    }
    async run(client,message,args,prefix){
     if (!args[0]) {
                                return message.channel.send({embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**<:redTick_xyz:955391717954187284> | Give Me Something To Say.!**`)]});
            }
await message.delete();
        return await message.channel.send(args.join(' '));
    }
}
module.exports = say;