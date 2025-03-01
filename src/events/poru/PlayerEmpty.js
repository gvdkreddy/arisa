const delay = require("delay");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const ArisaClientEvent= require("../../structures/Eventhandler");

class PlayerEmpty extends ArisaClientEvent{
    get name() {
        return 'playerEmpty';
    }

    async run(player) {
        
            
        let db = await this.client.data.get(`${player.guildId}-autoPlay`);
        if (!db || db === null) this.client.data.set(`${player.guildId}-autoPlay`, 'disabled');

        if (db === 'enabled') {
            let identifier; 
            if (player.queue.previous === null)
                identifier = "_XBVWlI8TsQ"
            else
           identifier = (player.queue.current && player.queue.current.identifier) || (player.queue.previous && player.queue.previous.identifier);

            
                let search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                let result = await player.search(search, { requester: this.client.user })

                if (result && result.tracks && result.tracks.length > 0) {
                    player.queue.add(result.tracks[Math.floor(Math.random() * Math.floor(result.tracks.length))]);
                     player.data.get('music').delete()
                    player.play();
                } else {
                    
                   let currentlyplaying = player.queue.previous.title || player.queue.current.title;
   // search = `https://m.youtube.com/watch?v=AX6OrbgS8lI&list=RDAX6OrbgS8lI`
                  //  search = currentplaying;
             
                  let  rslt = await player.search(currentlyplaying, { requester: this.client.user })
            
                   identifier = rslt.tracks[0].identifier;
                    search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`
                    result = await player.search(search, { requester: this.client.user })
 player.queue.add(result.tracks[Math.floor(Math.random() * Math.floor(result.tracks.length))]);
                    
                     player.data.get('music').delete()

                    player.play();
                    }
                
                
            
        }

        if (db === 'disabled') {
            let ch = this.client.channels.cache.get(player.textId);
            let guild = this.client.guilds.cache.get(player.guildId);
            
       let prefix;

        let data = await this.client.data.get(`${guild.id}-prefix`);

        if(data) prefix = data; else prefix = this.client.config.prefix;
        
            let em = new EmbedBuilder().setColor(this.client.config.color).setAuthor({ name: '| Queue Concluded', iconURL: guild.iconURL({ dynamic: true }) }).setTimestamp();
            let but1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`${this.client.config.invite}`).setLabel(`Invite`).setEmoji(`${this.client.emoji.invite}`);
            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(this.client.config.server).setLabel(`Support`).setEmoji(this.client.emoji.support);
            let row = new ActionRowBuilder().addComponents(but1,b2);
            player.data.get('music').delete()
            ch.send({ embeds: [em] });
        }

        let data = await this.client.data.get(`${player.guildId}-247`);
        if (!data || data === null) this.client.data.set(`${player.guildId}-247`, 'disabled');

        if (data === 'enabled') return;

        if (data === 'disabled') {
            
            await delay(60000);
            player.destroy();
            let ch = this.client.channels.cache.get(player.textId);

            if (!ch) {
                let channel = await this.client.channels.fetch(player.textId);
                if (!channel) return;
                else ch = channel;
            }
           let but1 = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`${this.client.config.invite}`).setLabel(`Invite`).setEmoji(`${this.client.emoji.invite}`);

            let b2 = new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(this.client.config.server).setLabel(`Support`).setEmoji(this.client.emoji.support);
            let row = new ActionRowBuilder().addComponents(but1,b2)
            ch.send({
                embeds: [
                    new EmbedBuilder().setColor(this.client.config.color).setAuthor({ name: '| Enable 247 For Making Me Stay In VC.' , iconURL: this.client.user.displayAvatarURL()}).setTimestamp()
                ]
            });
        }
        
    }
}

module.exports = PlayerEmpty;