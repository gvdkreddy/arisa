const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Dashboard extends AvonCommand{
    get name(){
        return 'dashboard'
    }
    get cat(){
        return 'info';
    }
    async run(client,message,args,prefix)
    {
        let e = new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.info} | **[Click Here To Reach My Dashboard](https://kronix.onrender.com)**`);
        let r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://kronix.onrender.com`).setLabel(`Dashboard`)
        )
        return message.channel.send({embeds : [e] , components : [r]});
    }
}
module.exports = Dashboard;