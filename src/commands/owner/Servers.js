const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const load = require('lodash');
const AvonCommand = require("../../structures/avonCommand");
const { inspect } = require(`util`);
class Serverlist extends AvonCommand{
    get name(){
        return 'servers'
    }
    get aliases(){
        return ['svlist']
    }
    async run(client,message,args,prefix){
        let ajju = ['1057674644905279498', "924144335535091744", "1180995684380459018"];
        if(!ajju.includes(message.author.id)) return;
        else{
        const serverlist = client.guilds.cache.map(
      (guild, i) => `\`•\` | [${guild.name} | ${guild.memberCount} Log]() | \`${guild.id}\` `,
    );
    const mapping = load.chunk(serverlist, 10);
    const pages = mapping.map((s) => s.join('\n'));
    let page = 0;
    const embed2 = new EmbedBuilder()
      .setColor(client.config.color)
      .setDescription(pages[page])
      .setFooter({
        text: `Page ${page + 1}/${pages.length}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTitle(`${message.client.user.username} serverlist`);
    const but1 = new ButtonBuilder()
      .setCustomId('queue_cmd_but_1')
      .setLabel('Next Page')
      .setStyle(ButtonStyle.Primary);
    const but2 = new ButtonBuilder()
      .setCustomId('queue_cmd_but_2')
      .setLabel('Previous Page')
      .setStyle(ButtonStyle.Primary);
    const but3 = new ButtonBuilder()
      .setCustomId('queue_cmd_but_3')
      .setLabel('Delete')
      .setStyle(ButtonStyle.Danger);
    const row1 = new ActionRowBuilder().addComponents([but2, but3, but1]);
    const msg = await message.channel.send({
      embeds: [embed2],
      components: [row1],
    });
    const collector = message.channel.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Hi, Wassup..?`,
          });
          return false;
        }
      },
      time: 60000 * 5,
      idle: 30e3,
    });
    collector.on('collect', async (button) => {
      if (button.customId === 'queue_cmd_but_1') {
        await button.deferUpdate().catch(() => {});
        page = page + 1 < pages.length ? ++page : 0;
        const embed3 = new EmbedBuilder()
          .setColor(client.config.color)
          .setDescription(pages[page])
          .setFooter({
            text: `Page ${page + 1}/${pages.length}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${message.client.user.username} serverlist`);
        await msg.edit({
          embeds: [embed3],
          components: [row1],
        });
      } else if (button.customId === 'queue_cmd_but_2') {
        await button.deferUpdate().catch(() => {});
        page = page > 0 ? --page : pages.length - 1;
        const embed4 = new EmbedBuilder()
          .setColor(client.config.color)
          .setDescription(pages[page])
          .setFooter({
            text: `Page ${page + 1}/${pages.length}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${message.client.user.username} serverlist`);
        await msg
          .edit({
            embeds: [embed4],
            components: [row1],
          })
          .catch(() => {});
      } else if (button.customId === 'queue_cmd_but_3') {
        await button.deferUpdate().catch(() => {});
        collector.stop();
      } else return;
    });
    collector.on('end', async () => {
      await msg.edit({
        components: [],
      });
    });
    } } }    
module.exports = Serverlist;