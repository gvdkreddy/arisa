const { EmbedBuilder } = require("discord.js");

const AvonCommand = require("../../structures/avonCommand");

class Electronic extends AvonCommand{

    get name(){

        return 'electronic'

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

        

           let data = player.data.get(`electronic`);

        if(!data || data === false || data === undefined)

        {

                player.send({

          op: 'filters',

          guildId: message.guild.id,

          equalizer: [

            { band: 0, gain: 0.375 },

            { band: 1, gain: 0.35 },

            { band: 2, gain: 0.125 },

            { band: 3, gain: 0 },

            { band: 4, gain: 0 },

            { band: 5, gain: -0.125 },

            { band: 6, gain: -0.125 },

            { band: 7, gain: 0 },

            { band: 8, gain: 0.25 },

            { band: 9, gain: 0.125 },

            { band: 10, gain: 0.15 },

            { band: 11, gain: 0.2 },

            { band: 12, gain: 0.25 },

            { band: 13, gain: 0.35 },

            { band: 14, gain: 0.4 },

          ],

        });

         player.data.set(`electronic`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Electronic filter of the player`).setTimestamp()]});

        }

        if(data === true)

        {

            player.send({guildId : message.guild.id , op : 'filters'});

            player.data.set(`electronic`,false);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Electronic filter of the player`).setTimestamp()]});

        }

        

        }

    }

module.exports = Electronic;