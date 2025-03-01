const AvonCommand = require("../../structures/avonCommand");

const { EmbedBuilder } = require(`discord.js`);

class Soft extends AvonCommand{

    get name(){

        return 'soft'

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

        let data = player.data.get(`soft`);

        if(!data || data === false || data === undefined)

        {

            player.send({

                guildId : message.guild.id,

                op : 'filters',

                lowPass : {
                   smoothing: 20.0 
                   },

            });

            player.data.set(`soft`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Soft filter of the player`).setTimestamp()]})

        }

        if(data === true)

        {

            player.data.set(`soft`,false);

            player.send({

                guildId : message.guild.id,

                op : 'filters'

            });

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Soft filter of the player`).setTimestamp()]})

        }

    }

}

module.exports = Soft;