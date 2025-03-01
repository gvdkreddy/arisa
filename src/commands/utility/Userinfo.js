const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require(`discord.js`);
const axios = require("axios");
const ArisaCommand = require("../../structures/avonCommand");
const moment = require("moment");
class userinfo extends ArisaCommand {

    get name(){

        return 'userinfo'

    }

    get aliases(){

        return ['ui']

    }

    get cat(){

        return 'utility'

    }

    async run(client,message,args,prefix){
        try {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
      const nick = member.nickname === null ? "None" : member.nickname;
      var bot = {
            "true": "Bot",
            "false": "Human"
        };
        let rolesname;
let roles = member.roles.cache.sort((a, b) => b.position).map
(role => role.toString()).slice(0, -1);
rolesname = roles.join(" ")
if(member.roles.cache.size < 1) role = "No Roles"
if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = 
`\`None\``

axios.get(`https://discord.com/api/users/${user.id}`, {

    headers: {

      Authorization: `Bot ${client.config.token}`,

    },

  }).then(res => {

    const { banner, accent_color } = res.data;
       if (banner) {

      const extension = banner.startsWith("a_") ? ".gif" : ".png";

      const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=1024`;
      
      let em = new EmbedBuilder()
        .setAuthor({name: `${member.user.username}'s Information`, 
                    iconURL: user.displayAvatarURL({ dynamic : true })})
        
        .addFields([{name: '__General Information__', value: `**Name: **${member.user.username}#${member.user.discriminator}\n**ID: **${member.id}\n**User Type: **${bot[member.user.bot]}\n**Account Created: **<t:${moment.utc(member.user.createdAt).format('X')}:R>`}, 
      
        {name: '__Role Info__', value: `**Roles: **[${roles.length || '0' }]
${rolesname || 'None' }`},
                    {name: '__Banner__', value: `Below Picture is the ${user} **Banner**`}
    ])
    .setThumbnail(user.displayAvatarURL({ dynamic : true }))
    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setTimestamp()
    .setColor(client.config.color)
    .setImage(url);
           
           return message.channel.send({embeds : [em]})
           }else{
               if (accent_color) {
                    let emb = new EmbedBuilder()

        .setAuthor({name: `${member.user.username}'s Information`, 

                    iconURL: user.displayAvatarURL({ dynamic : true })})

        

        .addFields([{name: '__General Information__', value: `**Name: **${member.user.username}#${member.user.discriminator}\n**ID: **${member.id}\n**User Type: **${bot[member.user.bot]}\n**Account Created: **<t:${moment.utc(member.user.createdAt).format('X')}:R>`}, 

      

        {name: '__Role Info__', value: `**Roles: **[${roles.length || '0' }]

${rolesname || 'None' }`},

                    {name: '__Banner__', value: `${user} dont have a banner But they do have a **Acccent Color** which is shown in the Embed Color`}

    ])

    .setThumbnail(user.displayAvatarURL({ dynamic : true }))

    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

    .setTimestamp()

    .setColor(accent_color);
                   
                       return message.channel.send({embeds : [emb]})
               } else {
                   let emb2 = new EmbedBuilder()

        .setAuthor({name: `${member.user.username}'s Information`, 

                    iconURL: user.displayAvatarURL({ dynamic : true })})

        

        .addFields([{name: '__General Information__', value: `**Name: **${member.user.username}#${member.user.discriminator}\n**ID: **${member.id}\n**User Type: **${bot[member.user.bot]}\n**Account Created: **<t:${moment.utc(member.user.createdAt).format('X')}:R>`}, 

      

        {name: '__Role Info__', value: `**Roles: **[${roles.length || '0' }]

${rolesname || 'None' }`},

                    {name: '__Banner__', value: `${user} do not have a **Acccent Color** nor a **Banner**`}

    ])

    .setThumbnail(user.displayAvatarURL({ dynamic : true }))

    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

    .setTimestamp()

    .setColor(client.config.color);

                   

                       return message.channel.send({embeds : [emb2]})
               }
               
    
        
     }
    })
  
     } catch(err) { console.log(err) }
    }}
module.exports = userinfo;    