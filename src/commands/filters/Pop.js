const AvonCommand = require("../../structures/avonCommand");

const { EmbedBuilder } = require(`discord.js`);

class Pop extends AvonCommand{

    get name(){

        return 'pop'

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

        let data = player.data.get(`pop`);

        if(!data || data === false || data === undefined)

        {

            player.send({

                guildId : message.guild.id,

                op : 'filters',

                equalizer: [

          { band: 0, gain: 0.65 },

          { band: 1, gain: 0.45 },

          { band: 2, gain: -0.45 },

          { band: 3, gain: -0.65 },

          { band: 4, gain: -0.35 },

          { band: 5, gain: 0.45 },

          { band: 6, gain: 0.55 },

          { band: 7, gain: 0.6 },

          { band: 8, gain: 0.6 },

          { band: 9, gain: 0.6 },

          { band: 10, gain: 0 },

          { band: 11, gain: 0 },

          { band: 12, gain: 0 },

          { band: 13, gain: 0 },

        ]

            });

            player.data.set(`pop`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Pop filter of the player`).setTimestamp()]})

        }

        if(data === true)

        {

            player.data.set(`pop`,false);

            player.send({

                guildId : message.guild.id,

                op : 'filters'

            });

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Pop filter of the player`).setTimestamp()]})

        }

    }

}

module.exports = Pop;