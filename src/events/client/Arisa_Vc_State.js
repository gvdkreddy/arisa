const { EmbedBuilder } = require("discord.js");
const delay = require("delay");
const AvonClientEvent = require("../../structures/Eventhandler");

class AvonVoiceStateUpdate extends AvonClientEvent {
  get name() {
    return "voiceStateUpdate";
  }

  async run(os, ns) {
    let player = this.client.poru.players.get(ns.guild.id || os.guild.id);
    if (!player) return;
    if (os.id === this.client.user.id) return;

    // Check if either the old or new voice channel is a stage channel
    const isStageChannel = (channel) =>
      channel && channel.type === "GUILD_STAGE_VOICE";

    if (isStageChannel(ns.channel) || isStageChannel(os.channel)) {
      // Handle stage channel logic here, such as playing a track
      if (ns.guild.me.permissions.has("SPEAK")) {
              ns.guild.me.voice.setSuppressed(false).catch((e) => { });
      }
    }

    if (!ns.guild || ns.member.user.bot) return;

    if (os.guild.members.me.voice.channelId === os.channelId) {
      if (os.guild.members.me.voice.channel) {
        await delay(15000);
        if (os.guild.members.cache.get(this.client.user.id).voice.channel.members.size === 1) {
          player.destroy();
          let channel = this.client.channels.cache.get(player.textId);
          if (channel) {
            const embed = new EmbedBuilder()
              .setColor(this.client.config.color)
              .setAuthor({
                name: "Player Destroyed Due To Absence Of Listeners",
                iconURL: this.client.user.displayAvatarURL()
              });
            await channel.send({ embeds: [embed] });
          }
        }
      }
    }
  }
}

module.exports = AvonVoiceStateUpdate;
