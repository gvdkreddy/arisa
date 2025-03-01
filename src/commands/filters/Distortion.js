const AvonCommand = require("../../structures/avonCommand");

const { EmbedBuilder } = require(`discord.js`);

class Distortion extends AvonCommand{

    get name(){

        return 'distortion';

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

        let data = player.data.get(`distortion`);

        if(!data || data === false || data === undefined)

        {

            player.send({

                guildId : message.guild.id,

                op : 'filters',

                distortion: {

          sinOffset: 0,

          sinScale: 1,

          cosOffset: 0,

          cosScale: 1,

          tanOffset: 0,

          tanScale: 1,

          offset: 0,

          scale: 1,

        }

            });

            player.data.set(`distortion`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Distortion filter of the player`).setTimestamp()]})

        }

        if(data === true)

        {

            player.data.set(`distortion`,false);

            player.send({

                guildId : message.guild.id,

                op : 'filters'

            });

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Distortion filter of the player`).setTimestamp()]})

        }

    }

}

module.exports = Distortion;