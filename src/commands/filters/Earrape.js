const { EmbedBuilder } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Earrape extends AvonCommand{

    get name(){

        return 'earrape'

    }

    get aliases(){

        return []

    }

    get player(){

        return true;

    }

    get vote(){

        return false

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

        

           let data = player.data.get(`earrape`);

        if(!data || data === false || data === undefined)

        {

        player.send({

          op: 'filters',

          guildId: message.guild.id,

          equalizer: [

            { band: 0, gain: 0.25 },

            { band: 1, gain: 0.5 },

            { band: 2, gain: -0.5 },

            { band: 3, gain: -0.25 },

            { band: 4, gain: 0 },

            { band: 6, gain: -0.025 },

            { band: 7, gain: -0.0175 },

            { band: 8, gain: 0 },

            { band: 9, gain: 0 },

            { band: 10, gain: 0.0125 },

            { band: 11, gain: 0.025 },

            { band: 12, gain: 0.375 },

            { band: 13, gain: 0.125 },

            { band: 14, gain: 0.125 },

          ],

        });

         player.data.set(`earrape`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Earrape filter of the player`).setTimestamp()]});

        }

        if(data === true)

        {

            player.send({guildId : message.guild.id , op : 'filters'});

            player.data.set(`earraper`,false);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Earrape filter of the player`).setTimestamp()]});

        }

        

        }

    }

module.exports = Earrape;