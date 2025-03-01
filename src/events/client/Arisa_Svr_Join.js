const { PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, messageLink, WebhookClient, ChannelType } = require("discord.js");
const AvonClientEvent = require(`../../structures/Eventhandler`);
class AvonGuildCreate extends AvonClientEvent{
    get name(){
        return 'guildCreate'
    }
    async run(guild){
        try{
        this.client.data.set(`${guild.id}-247`,`disabled`);
        this.client.data.set(`${guild.id}-autoPlay`,`disabled`);
        this.client.data2.set(`noprefix_${guild.id}`,[]);
            
            let mainChannel;

            guild.channels.cache.forEach((x) => {

                if (guild.members.me

                    .permissionsIn(x)

                    .has([
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ViewChannel,
                ]) &&
                    x.type === ChannelType.GuildText &&
                    !mainChannel)
                    mainChannel = x;
            });
            
            let invite;

            if (mainChannel)
                invite = await mainChannel?.createInvite({ maxAge: 0 }).catch(() => { });
            else
                invite = "Unable to fetch Invite";
            if (!invite)
                invite = "None";
            let owner = await guild?.fetchOwner();
    let embed = new EmbedBuilder().setColor(this.client.config.color).setAuthor({name : `| GUILD JOINED`,iconURL : this.client.user.displayAvatarURL()}).setDescription(
        `> • Server Name - ${guild.name}
> • Server members - ${guild.memberCount}

> • Guild Created at - <t:${Math.round(guild.createdTimestamp/1000)}:R>
> • Guild Joined At - <t:${Math.round(guild.joinedTimestamp/1000)}:R>
> • Guild Owner - ${guild.members.cache.get(owner.id) ? guild.members.cache.get(owner.id).user.tag : 'Hoga koi mujhe kya'}
> • Guild Invite - ${invite}

> • Servers Now - ${this.client.guilds.cache.size}
> • Users Now - ${this.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`
    ).setThumbnail(guild.iconURL({dynamic : true}));
    const web = new WebhookClient({url : `https://discord.com/api/webhooks/1104078467638775899/pgQrsBVbr9jrGQCvWU2fWeLoHgjmSYqUuXp5u7TS9GMRk6Z48hCdQu_EiLpq2-6PA8tU`});
    web.send({embeds : [embed]});
        
    } catch(e) { console.log(e) }
}
}
module.exports = AvonGuildCreate;