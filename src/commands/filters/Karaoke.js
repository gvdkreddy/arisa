const AvonCommand = require("../../structures/avonCommand");

const { EmbedBuilder } = require(`discord.js`);

class Karaoke extends AvonCommand{

    get name(){

        return 'karaoke'

    }

    get aliases(){

        return null;

    }

    get inVoice(){

        return true;

    }

    get sameVoice(){

        return true;

    }

    get cat(){

        return 'filters'

    }

    get vote(){

        return false;

    }

    get player(){

        return true;

    }

    async run(client,message,args,prefix,player){

        let data = player.data.get(`karaoke`);

        if(!data || data === false || data === undefined)

        {

            player.send({

                guildId : message.guild.id,

                op : 'filters',

                karaoke: {

          level: 1.0,

          monoLevel: 1.0,

          filterBand: 220.0,

          filterWidth: 100.0
          
          }

            });

            player.data.set(`karaoke`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Karaoke filter of the player`).setTimestamp()]})

        }

        if(data === true)

        {

            player.data.set(`karaoke`,false);

            player.send({

                guildId : message.guild.id,

                op : 'filters'

            });

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Karaoke filter of the player`).setTimestamp()]})

        }

    }

}

module.exports = Karaoke;