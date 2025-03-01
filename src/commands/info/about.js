const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand")

class About extends AvonCommand{
    get name(){
        return 'about';
    }
    get aliases(){
        return ['botinfo'];
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix,player){
       message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`**__Arisa Music__** is a high quality music bot that offers the 24/7 in VC feature for free.

Listen to your favorite music with your friends anytime anywhere high-quality music, audio filters, 24/7 voice channel, Configuration, button control, and much more.

We focus on providing 24/7 high-quality music to our users for free to spice up your server's music experience.


~ Kronix Development`)]})
    }
}
module.exports = About;