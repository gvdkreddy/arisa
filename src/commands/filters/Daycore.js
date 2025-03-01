const AvonCommand = require("../../structures/avonCommand");

const { EmbedBuilder } = require(`discord.js`);

class Daycore extends AvonCommand{

    get name(){

        return 'daycore'

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

        let data = player.data.get(`day`)

        if(!data || data == false || data == undefined)

        {

            player.send({

                guildId : message.guild.id,

                op : 'filters',

                timescale : {

                    speed : 1,

                    pitch : 0.9,

                    rate : 1

                }

            });

            player.data.set(`day`,true);

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Enabled the Daycore filter of the player`).setTimestamp()]});

        }

        if(data == true){

            player.data.set(`day`,false);

            player.send({

                guildId : message.guild.id,

                op : 'filters',

                timescale : {

                    speed : 1.0,

                    pitch : 1.0,

                    rate : 1.0

                }

            });

            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `Filters`, iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp().setDescription(`${client.emoji.filters} | Disabled the Daycore filter of the player`).setTimestamp()]});

        }

    }

}

module.exports = Daycore;