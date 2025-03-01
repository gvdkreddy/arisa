const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class RemoveFromPlaylist extends AvonCommand {
  get name() {
    return 'pl-removesong'; // Command name
  }

  get aliases() {
    return ['pl-removetrack']; // Command aliases
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix) {
    try {
      // Check if the user provided a playlist name and a track index
      const playlistName = args[0];
      const trackIndex = parseInt(args[1]);

      if (!playlistName || isNaN(trackIndex)) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide the name of the playlist and the index of the track to remove.**`)] });
      }

      // Find the playlist with the provided name and owned by the user
      const playlist = await Playlist.findOne({ name: playlistName, owner: message.author.id });

      if (!playlist) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` not found or you don't have permission to modify it.`)],
        });
      }

      // Check if the provided track index is valid
      if (trackIndex < 1 || trackIndex > playlist.songs.length) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Invalid track index. Provide a number between 1 and ${playlist.songs.length}.`)],
        });
      }

      // Remove the track from the playlist
      const removedTrack = playlist.songs.splice(trackIndex - 1, 1);
      await playlist.save();

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Track #${trackIndex} has been removed from playlist \`${playlistName}\`.\nRemoved Track: **${removedTrack[0].title}**`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = RemoveFromPlaylist;
