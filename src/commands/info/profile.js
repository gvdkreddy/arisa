const AvonCommand = require("../../structures/avonCommand");
const api = require(`@top-gg/sdk`);
const { topggapi } = require(`../../../config.json`);
const vote = new api.Api(topggapi);
const badge = require(`./badges.json`);
const { EmbedBuilder } = require("discord.js");
class Badges extends AvonCommand{
    get name(){
        return 'profile';
    }
    get aliases(){
        return ['badges','badge','pr'];
    }
    get cat(){
        return 'info'
    }
    async run(client,message,args,prefix)
    {
        try{
        let user;
        
        let badges = '';
        let member = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let guild = await client.guilds.fetch('1063452003910553731');
        user = await guild.members.fetch(member.id).catch((e) =>{ badges += `${client.emoji.users} **Bot User** \n\n*Join Support Server To Get More Badges*`;}) 
        let voted = await vote.hasVoted(member.id);
    
        try{
            let sys = user.roles.cache;
            if(sys.has(badge.dev)) badges += `\n ${client.emoji.dev} **Developer**`;
            if(sys.has(badge.owner)) badges += `\n ${client.emoji.owner} **Owner**`;
            if(sys.has(badge.codev)) badges += `\n ${client.emoji.codev} **Co-Owner**`;
            if(sys.has(badge.admin)) badges += `\n ${client.emoji.admin} **Admin**`; 
          if(sys.has(badge.mod)) badges += `\n ${client.emoji.mod} **Moderator**`;
            if(sys.has(badge.supporter)) badges += `\n ${client.emoji.supporter} **Supporter**`;
            if(sys.has(badge.nop)) badges += `\n ${client.emoji.nop} **No Prefix**`;
            if(sys.has(badge.vip)) badges += `\n ${client.emoji.vip} **Vip**`;
            if(sys.has(badge.staff))badges += `\n ${client.emoji.staff} **Staff**`;
            if(sys.has(badge.friend)) badges += `\n ${client.emoji.friend} **Friends**`;
            if(sys.has(badge.bug)) badges += `\n ${client.emoji.bug} **Bug Hunter**`;
            if(voted) badges += `\n ${client.emoji.voter} **Voter**`;
            if(sys.has(user)) badges += `\n ${client.emoji.users} **Member**`;}
            catch(e) { 
                badges = `${client.emoji.users} **Bot User**`;
            }
        
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setFooter({text : `Join Support Server To Get More Badges` , iconURL : message.guild.iconURL({dynamic : true})}).setAuthor({name : `Profile for ${member.tag}`}).addFields({name : `__BADGES__ <a:badges:1075043375419490435>` , value : `${badges}`}).setThumbnail(member.displayAvatarURL({dynamic : true}))]})
    } catch(e) { 
        console.log(e)
        let badges = '';
        badges = `${client.emoji.users} **Bot User**`;
        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`__**BADGES**__ \n ${client.emoji.users} **Bot User**)`).setFooter({text : `Join Support Server To Get More Badges` , iconURL : message.guild.iconURL({dynamic : true})}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))]})
    }
}
}
module.exports = Badges;