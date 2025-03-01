const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Sources extends AvonCommand{
    get name(){
        return 'sources'
    }
    get aliases(){
        return ['source']
    }
    get vote(){
        return false;
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix){
        let em = new EmbedBuilder().setColor(client.config.color).addFields({name : `__Link Based Supported Sources__` , value : `\`Spotify\`, \`Youtube\`, \`Apple Music\`, \`SoundCloud\`, \`Deezer\``});
      let b1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Spotify`).setURL(`https://open.spotify.com`);
        let b2 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`YouTube`).setURL(`https://youtube.com`);
        let b3 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`SoundCloud`).setURL(`https://soundcloud.com`);
       let b4 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Deezer`).setURL(`https://deezer.com`);

        let row = new ActionRowBuilder().addComponents(b1,b2,b3,b4);

        return message.channel.send({embeds : [em] , components : [row]});
    }
}
module.exports = Sources;