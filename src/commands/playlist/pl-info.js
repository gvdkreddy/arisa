const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class ViewPlaylist extends AvonCommand {
  get name() {
    return 'pl-info'; // Command name
  }

  get aliases() {
    return ['playlistinfo']; // Command aliases
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix) {
    try {
      // Check if the user provided a playlist name
      const playlistName = args.join(' ');

      if (!playlistName) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide the name of the playlist to view.**`) ]});
      }
      

      // Find the playlist with the provided name and owned by the user
      const playlist = await Playlist.findOne({ name: playlistName, owner: message.author.id });

      if (!playlist) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` not found or you don't have permission to view it.`)],
        });
      }

      if (playlist.songs.length === 0) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` is empty.`)],
        });
      }

      // Create a list of tracks in the playlist
      const trackList = playlist.songs
        .map((track, index) => `${index + 1}. **${track.title}**`)
        .join('\n');

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Tracks in playlist \`${playlistName}\`:\n${trackList}`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = ViewPlaylist;
