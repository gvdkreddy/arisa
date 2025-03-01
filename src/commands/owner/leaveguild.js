const { EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class leaveguild extends AvonCommand{
    get name(){
        return 'leaveguild';
    }
    get aliases(){
        return ['lg'];
    }
    async run(client,message,args,guildData,prefix){
      try {
      let ok = ['1057674644905279498', "924144335535091744", "1180995684380459018"];
      if(!ok.includes(message.author.id)) return;
        
      const gleave = args[0];
 
      if (!gleave) {
        return message.channel.send({content: "Please provide an id"});
      }
         
      const guild = client.guilds.cache.find((g) => g.id === gleave);
         
      if (!guild) {
        return message.channel.send({content: "That guild wasn't found"});
      }
         
      try {
        await guild.leave();
        message.channel.send({content: `I have left the Guild: **${guild.name}**`});
      } catch (error) {
        console.error(error);
        return message.channel.send({content: "I Couldent leave the Guild!"});
      } 
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]});
    }
    }   
}
module.exports = leaveguild;