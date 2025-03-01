const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { afk } = require("../../models/afk");
const CloudZCommand = require("../../structures/avonCommand");

class Afk extends CloudZCommand{
    get name(){
        return 'afk';
    }
    get cat(){
        return 'utility';
    }
    async run(client,message,args,prefix){
    const reason = args.join(" ") || "Some Work";

    afk.set(message.author.id, [Date.now(), reason]);

    message.channel.send(`> <@${message.member.user.id}>, You're **AFK** Set For \`${reason}\``)
  }
};
module.exports = Afk;