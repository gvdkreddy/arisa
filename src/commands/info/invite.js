const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Invite extends AvonCommand{
    get name(){
        return 'invite'
    }
    get aliases(){
        return 'inv'
    }
    get cat(){
        return 'info';
    }
    async run(client,message,args,prefix)
    {
        let e = new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.info} | **[Click Here to Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=279230934336&scope=bot)**`);
        let r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=279230934336&scope=bot`).setLabel(`Invite`)
        )
        return message.channel.send({embeds : [e] , components : [r]});
    }
}
module.exports = Invite;