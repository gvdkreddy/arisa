const { EmbedBuilder } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Party extends AvonCommand{

    get name(){

        return 'party'

    }

    get aliases(){

        return []

    }

    get player(){

        return true

    }

    get vote(){

        return false;

    }

    get cat(){

        return 'filters'

    }

    get inVoice(){

        return true

    }

    get sameVoice(){

        return true

    }

    async run(client,message,args,prefix,player){ 

        

           let data = player.data.get(`party`);

        if(!data || data === false || data === undefined)

        {

                player.send({

          op: 'filters',

          guildId: message.guild.id,

          equalizer: [

            { band: 0, gain: -1.16 },

            { band: 1, gain: 0.28 },

            { band: 2, gain: 0.42 },

            { band: 3, gain: 0.5 },

            { band: 4, gain: 0.36 },

            { band: 5, gain: 0 },

            { band: 6, gain: -0.3 },

            { band: 7, gain: -0.21 },

            { band: 8, gain: -0.21 },

          ],

        });

         player.data.set(`party`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Party filter of the player`).setTimestamp()]});

        }

        if(data === true)

        {

            player.send({guildId : message.guild.id , op : 'filters'});

            player.data.set(`party`,false);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Party filter of the player`).setTimestamp()]});

        }

        

        }

    }

module.exports = Party;