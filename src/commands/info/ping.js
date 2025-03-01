const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require(`discord.js`);
const AvonCommand = require("../../structures/avonCommand");
const moment = require(`moment`);
require(`moment-duration-format`);

class ping extends AvonCommand {
    get name(){
        return 'ping'
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
      let uptime = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
      let em = new EmbedBuilder().setAuthor({name : `| ${client.user.username}'s Ping & Uptime` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL()).setFooter({text : `Made By Kronix Development` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setColor(client.config.color).addFields([
            {name : `${client.emoji.ping} Ping:` , value : `╰-𒆕 ${Math.round(client.ws.ping)}ms`}
        ]).addFields([
            {name : `${client.emoji.uptime} Uptime:` , value : `╰-𒆕 ${uptime}`}
        ]);
        return message.channel.send({embeds : [em]});
    }
}
module.exports = ping;