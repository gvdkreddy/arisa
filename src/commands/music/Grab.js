const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { muzicard } = require("muzicard");
const moment = require(`moment`);
const AvonCommand = require("../../structures/avonCommand");

class Grab extends AvonCommand{
    get name(){
        return 'grab'
    }
    get aliases(){
        return ['grab']
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
    async run(client,message,args,prefix,player)
    {
         const currentTime = moment.duration(player.position).asMinutes();
        const totalTime = moment.duration(player.queue.current.length).asMinutes();
        const percentageCompletion = (currentTime / totalTime ) * 100;
        const roundedPercentage = Math.round(percentageCompletion);

         const card = new muzicard()
        .setName(player.queue.current.title)
        .setAuthor(player.queue.current.author)
        .setColor("auto")
        .setTheme("neonx")
        .setBrightness(100)
        .setThumbnail(player.queue.current.thumbnail)
        .setProgress(0)
        .setStartTime("0:00")
        .setEndTime(totalTime.toFixed(2))

    const buffer = await card.build();
    const attachment = new AttachmentBuilder(buffer, { name: `muzicard.png` });
        
     message.author.send({files: [attachment], content: `[${player.queue.current.title}](${player.queue.current.uri})`}).then(() => {
     message.reply({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | **Succesfully Grabbed the Song in your __DM's__**`)]})}).catch((err) => { message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | **Your __DM's__ are Off, Turn Them on To Grab a Song.**`)]})})
    }
}
module.exports = Grab;