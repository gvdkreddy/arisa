const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");
class Shuffle extends AvonCommand{
    get name(){
        return 'shuffle';
    }
    get aliases(){
        return ['shuff'];
    }
    get player(){
        return true;
    }
    get cat(){
        return 'music'
    }
    get inVoice(){
        return true;
    }
    get sameVoice(){

        return true;

    }

    async run(client,message,args,prefix,player){

        try{

        if(player.queue.length < 3){

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | At least 3 Tracks Needed In Queue`).setAuthor({name : `Shuffle` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

        else{

            player.queue.shuffle();

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.shufflebutton} | Shuffled The Queue`).setAuthor({name : `Shuffle` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})

        }

    } catch (e) { console.log(e) }

}}

module.exports = Shuffle;

