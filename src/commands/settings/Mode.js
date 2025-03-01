const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand")

class Mode extends AvonCommand{
    get name(){
        return 'mode';
    }
    get aliases(){
        return ['butmod']
    }
    get vote(){
        return true;
    }
    get cat(){
        return 'set'
    }
    get player(){
        return false;
    }
    get inVoice(){
        return false;
    }
    get sameVoice(){
        return false;
    }
    async run(client,message,args,prefix){
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && !client.config.owners.includes(message.author.id)){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | **You are lacking permissions : Manage Guild**`).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        let data = await client.data.get(`${message.guild.id}-mode`)
        let ajju = await client.data.get(`${message.guild.id}-play`)
        let modd = "Nothing"
        if (ajju === `dir+play`) modd = "Direct+Play";
        if (ajju === `but+play`) modd = "Buttons+Play";
        if (!ajju || ajju === null || ajju === `nothing`) modd = "Direct+Play";
        let mode = "Nothing";
        if (data === `nobut`) mode = "Muzicard+NoButtons";
        if (data === `emb+nobut`) mode = "Emb+NoButtons";
        if (data === `emb+lessbut`) mode = "Emb+Buttons"; 
        if (data === `lessbut`) mode = "Muzicard+Buttons";
        if (data === `spoticard`) mode = "Spoticard";
        if (!data || data === null || data === `nothing`) mode = "Muzicard+Buttons";
        let action = args[0];
        if (!args[0]){
        return message.channel.send({ embeds : [new EmbedBuilder().addFields([

                { name: `<:join_kastro:1064433481641377802>  __For MuziCard+Buttons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode mc+buttons\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For MuziCard+NoButtons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode mc+nobuttons\``, inline: true }, 
            { name: `<a:spotify_kastro:1064432093821685821> __For Spoticard Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode spoticard\``, inline: true }, 
            { name: `<:join_kastro:1064433481641377802>  __For Embed+Buttons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode emb+buttons\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For Embed+NoButtons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode emb+nobuttons\``, inline: true }, 
                { name: `<:Icons_utility:1069995603381211146> __For Resetting Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode reset+mode\``, inline: true },
            { name: `<:join_kastro:1064433481641377802> __For Direct Play Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode dir+play\``, inline: true },
            { name: `<:leave_kastro:1064433478143320094> __For Engine Selection Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode but+play\``, inline: true },
             { name: `<:Icons_utility:1069995603381211146> __For Resetting Play Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode reset+play\``, inline: true },
                ]).setAuthor({

                name: `| Current Mode : \`${mode}\` with \`${modd}\``,

                iconURL: message.guild.iconURL(),

            }).setFooter({
                text: `| Requested by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true }),
            })

            .setTimestamp().setColor(client.config.color)]
         })
        }
        
        if (action === "dir+play"){
        if(!ajju || ajju === null || ajju === `but+play`){
        client.data.set(`${message.guild.id}-play`,`dir+play`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled Direct Play Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        }
         if (action === "but+play"){
        if(!ajju || ajju === null || ajju === `dir+play`){
        client.data.set(`${message.guild.id}-play`,`but+play`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled Search Engine Play Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        
        }
        if (action === "reset+play"){
        if(!ajju || ajju === `dir+play` || ajju === `but+play`){
        client.data.set(`${message.guild.id}-play`,`nothing`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Resetted all the Modes`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
            if( data === `nothing` || !data || data === null ) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No Mode is setuped`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        }
        if (action === "mc+nobuttons"){
        if(!data || data === null || data === `lessbut` || data === `nothing` || data === `emb+nobut` || data === `emb+lessbut` || data === `spoticard`){
        client.data.set(`${message.guild.id}-mode`,`nobut`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled Muzicard With NoButtons Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        
        }
        if (action === "emb+nobuttons"){
        if(!data || data === null || data === `lessbut` || data === `nothing` || data === `nobut` || data === `emb+lessbut` || data === `spoticard`){
        client.data.set(`${message.guild.id}-mode`,`emb+nobut`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled Embed With NoButtons Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        
        }
        if ( action === "emb+buttons" ){
        if(!data || data === null || data === `nobut` || data === `nothing` || data === `emb+nobut` || data === `lessbut` || data === `spoticard`){
        client.data.set(`${message.guild.id}-mode`,`emb+lessbut`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled Embed With Buttons Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        }
        if ( action === "mc+buttons" ){
        if(!data || data === null || data === `nobut` || data === `nothing` || data === `emb+nobut` || data === `emb+lessbut` || data === `spoticard`){
        client.data.set(`${message.guild.id}-mode`,`lessbut`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled Muzicard With Buttons Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        }
        if ( action === "spoticard" ){
        if(!data || data === null || data === `nobut` || data === `nothing` || data === `emb+nobut` || data === `emb+lessbut` || data === `lessbut`){
        client.data.set(`${message.guild.id}-mode`,`spoticard`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Enabled SpotiCard Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Already Enabled This Mode`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        }
        if (action === "reset+mode"){
        if(data || data === `lessbut` || data === `nobut` || data === `emb+lessbut` || data === `emb+nobut` || data === `spoticard`){
        client.data.set(`${message.guild.id}-mode`,`nothing`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Resetted all the Modes`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }else{
            if( data === `nothing` || !data || data === null ) return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No Mode is setuped`).setAuthor({name : `Mode` , iconURL : message.guild.iconURL()}).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}).setTimestamp()]})
        }
        }else{
            return message.channel.send({ embeds : [new EmbedBuilder().addFields([

                { name: `<:join_kastro:1064433481641377802>  __For Buttons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode buttons\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For No Buttons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode nobuttons\``, inline: true }, 
                { name: `<:join_kastro:1064433481641377802>  __For Embed+Buttons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode emb+buttons\``, inline: true },
               { name: `<:leave_kastro:1064433478143320094> __For Embed+NoButtons Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode emb+nobuttons\``, inline: true }, 
                { name: `<:Icons_utility:1069995603381211146> __For Resetting Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode reset+mode\``, inline: true },
            { name: `<:join_kastro:1064433481641377802> __For Direct Play Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode dir+play\``, inline: true },
            { name: `<:leave_kastro:1064433478143320094> __For Engine Selection Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode but+play\``, inline: true },
             { name: `<:Icons_utility:1069995603381211146> __For Resetting Play Mode__`, value: `<:white_arrow:1172534680600457317> \`+mode reset+play\``, inline: true },
                ]).setAuthor({

                name: `| Current Mode : \`${mode}\``,

                iconURL: message.guild.iconURL(),

            }).setFooter({
                text: `| Requested by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ size: 2048, dynamic: true }),
            })
            .setTimestamp().setColor(client.config.color)]

         })
        }
    }
}
module.exports = Mode;
        