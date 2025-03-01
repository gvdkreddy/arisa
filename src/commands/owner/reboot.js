const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Reboot extends AvonCommand{
    get name(){
        return 'reboot';
    }
    get aliases(){
        return ['rb'];
    }
    async run(client,message,args,prefix){
      try {
        let ok = ['1057674644905279498', "924144335535091744", "1180995684380459018"];
        if(!ok.includes(message.author.id)) return;
      message.channel.send({content: "Restarting Bot! :)"})
        setTimeout(() => {
          process.kill(1);
        }, 2000);  
      } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]});
    }
    }   
}
module.exports = Reboot;