const { Collection , ButtonBuilder , ActionRowBuilder , ButtonStyle , EmbedBuilder, PermissionsBitField , WebhookClient } = require('discord.js');
const EventEmitter = require('events');
const { readdirSync } = require('fs');
const web = new WebhookClient({url : `https://discord.com/api/webhooks/1104078461158559815/BqGe60MiJ5AmCgUSlGaxYyZXlPu5XAkFFcBewEKcgmKu02EJnVk-AHzE_iRi-RQIRd6-`});
const ascii = require(`ascii-table`);
const config = require(`../../config.json`);
const table = new ascii().setHeading('Arisa Commands','Status');
const BotChannelsModel = require('../models/BotChannels');
const top = require(`@top-gg/sdk`);
const vote = new top.Api(config.topggapi);
const db3 = require("../models/dj");
const Blacklist = require('../models/blacklist');
const { afk } = require("../models/afk");
const moment = require("moment");
class ArisaCommands extends EventEmitter {
    constructor(client){
        super();
        this.client = client;
        this.commands = new Collection();
        this.load = false;
        this.on("error",async(err) => {console.error(err)});
        this.client.on('messageCreate',(message) => this.run(message));
    }
    loadCommands(){
        if(this.load) return this;
        readdirSync(`./src/commands/`).forEach(d => {
            const commands = readdirSync(`./src/commands/${d}/`).filter(f => f.endsWith('.js'));
            for(const cmd of commands){
                const AvonCommand = require(`${process.cwd()}/src/commands/${d}/${cmd}`);
                const command = new AvonCommand(this.client);
                this.commands.set(command.name,command);
                table.addRow(command.name,'✅');
            }
        });
        console.log(table.toString());
        this.load = true;
        return this;
    }

    async run(message){
        if(!message.guild || message.author.bot || message.attachments.size || message.stickers.size) return;
         if (message.author.bot) return;
          const isBlacklisted = await this.checkBlacklist(message.author.id); // && !this.client.config.owners.includes(message.author.id);
        if (isBlacklisted) return message.author.send(`**[You Are Blacklisted Contact Support By Clicking.!](https://discord.gg/aMC2e8zgQb)** \n\n Or Join & Appeal in https://discord.gg/aMC2e8zgQb`);;
        const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);
    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();
      message.reply(
        `> <@${mentionedMember.user.id}> is Currently **AFK** From (${timeAgo}) Due To \`${reason}\``
      );
    }
  }
        const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    message.reply(`> Welcome Back <@${message.author.id}>, I have removed your **AFK** `);
  }
         const { EmbedBuilder, PermissionsBitField } = require('discord.js');
        let botChannelsData = await BotChannelsModel.findOne({ guildId: message.guild.id }) || new BotChannelsModel({ guildId: message.guild.id });
let botChannels = botChannelsData.botChannels || [];
let hasManageGuildPermission = message.member.permissions.has(PermissionsBitField.Flags.ManageGuild);


        let prefix;
        let data = await this.client.data.get(`${message.guild.id}-prefix`);
        if(data) prefix = data; else prefix = this.client.config.prefix;

        if(message.content === `<@${this.client.user.id}>`)
        {
            let b1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Invite`).setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=415602886720&scope=bot`);
            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Support`).setURL(this.client.config.server);
            let b3 = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`);
            let ro = new ActionRowBuilder().addComponents(b1,b2,b3);
            let embed = new EmbedBuilder().setColor(this.client.config.color).setFooter({text : `Made By Kronix Development` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`Hey \`${message.author.username}\`,\n My Prefix is \`${prefix}\` For This Server\nType \`${prefix}help\` To Get All Commands\n\nTo Play a Track With me Type \`${prefix}play <Song Name>\``).setAuthor({name : `Settings For ${message.guild.name}` , iconURL : this.client.user.displayAvatarURL({dynamic : true})}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))
            return message.channel.send({embeds : [embed],components : [ro]}).catch((e) => { message.author.send({content : `Error while sending message there : ${e.message}`}).catch(() => {}) })
        }
       
        try{
        let np = ["1057674644905279498", "1031405873588875354"];
        let regex = RegExp(`^<@!?${this.client.user.id}>`);
        let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
        let db = await this.client.data2.get(`noprefix_${message.guild.id}`);
        let db2 = await this.client.data2.get(`noprefix_${this.client.user.id}`);
        if(!db2 || db2 === null) await this.client.data2.set(`noprefix_${this.client.user.id}`,[]);
        let pun = [];
        db2.forEach(x => pun.push(x));
        pun.forEach(punit => np.push(punit));
        if(!db || db === null) await this.client.data2.set(`noprefix_${message.guild.id}`,[]);
        let ooo = []
        db.forEach(x => ooo.push(x));
        ooo.forEach(x => np.push(x));
        if(!np.includes(message.author.id)){ if(!message.content.startsWith(pre)) return;}
        const args = np.includes(message.author.id) == false ? message.content.slice(pre.length).trim().split(/ +/) :  message.content.startsWith(pre) == true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const avonCommand = this.commands.get(commandName) || this.commands.find((c) => c.aliases && c.aliases.includes(commandName));
        if(!avonCommand) return;
        const em = new EmbedBuilder().setAuthor({name : `| Command Runned`,iconURL : message.author.displayAvatarURL({dynamic : true})})
                .setDescription(
                    `**Author name :** ${message.author.tag}
                    **Guild name :** ${message.guild.name}
                    **Guild Id :** ${message.guild.id}
                    **Command ran :** \`${avonCommand.name}\`
                    **Channel name :** ${message.channel.name}
                    **Channel :** <#${message.channel.id}>`
                    ).setThumbnail(message.guild.iconURL({dynamic : true}));
        web.send({embeds : [em]});
            if (botChannels.length > 0 && !botChannels.includes(message.channel.id)) {
    // The command can only be used in specified bot channels
    if (!hasManageGuildPermission) {
        // User doesn't have the Manage Guild permission, so we return
        return message.channel.send({embeds : [new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| This Channel Is Ignored.`,iconURL : message.author.displayAvatarURL({dynamic : true})})]});
    } 
}
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.ViewChannel)) return;
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) return message.author.send({content : `I dont have **Send Messages** Permissions in that channel`}).catch(e => null);
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.ReadMessageHistory)) return message.channel.send({content : `I don't have **Read Message History Permissions** here`});
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.UseExternalEmojis)) return message.channel.send({content : `I don't have **Use External Emojis** Permissions here`})
            if(!message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.EmbedLinks)) return message.channel.send({content : `I don't have **Embed Links** Permissions here`})
        let client = this.client;
        if(avonCommand.inVoice){
            if(message.guild.members.me.voice.channel && !message.member.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to a voice channel.`)]})
            }
        }
        if(avonCommand.sameVoice){
            if(message.guild.members.me.voice.channelId !== message.member.voice.channelId && message.guild.members.me.voice.channel){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | You must be connected to ${message.guild.members.me.voice.channel}`)]})
            }
        }
        if(avonCommand.vote)
        {
            let voted = await vote.hasVoted(message.author.id);
            if(!voted && !this.client.config.owners.includes(message.author.id)){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(config.color).setDescription(`${this.client.emoji.tick} | **[Vote Required Click here](https://top.gg/bot/1027828697828433980/vote)**`)],components : [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(`Vote`).setURL(`https://top.gg/bot/1027828697828433980/vote`))]})
            }
        }
            let djd = await db3.findOne({ Guild: message.guild.id })
      let perm = PermissionsBitField.Flags.ManageGuild;
      if (djd) {
        if (djd.Mode) {
          let pass = false;
          if (djd.Roles.length > 0) {
            message.member.roles.cache.forEach((x) => {
              let role = djd.Roles.find((r) => r === x.id);
              if (role) pass = true;
            });
          };
          if (!pass && !message.member.permissions.has(perm))   return message.channel.send({embeds : [new EmbedBuilder().setTimestamp().setColor(client.config.color).setAuthor({name : `${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`${client.emoji.cross} | You don't have dj role to use this Command`)]}).then(msg => setTimeout(() => msg.delete(), 8000));
        };
      };
        let player = client.poru.players.get(message.guild.id);
        if(avonCommand.player){
            if(!player || !player.queue.current){
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setAuthor({name : `| I am not playing Anything` , iconURL : message.author.displayAvatarURL({dynamic : true})})]})
            }

        }
        
        avonCommand.run(client,message,args,prefix,player).catch(e => console.log(e));
        } catch(e) { console.error(e) } 
    }
     async checkBlacklist(userId) {
        try {
            const blacklistedUser = await Blacklist.findOne({ userId });
            return !!blacklistedUser; // Return true if user is blacklisted, false otherwise
        } catch (error) {
            console.error('Error while checking blacklist:', error);
            return false; // Assuming no blacklisted user by default
        }
    }
}
module.exports = ArisaCommands;