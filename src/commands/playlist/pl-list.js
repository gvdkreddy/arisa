const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class ListPlaylists extends AvonCommand {
  get name() {
    return 'pl-list'; // Command name
  }

  get aliases() {
    return ['myplaylists', 'showplaylists']; // Command aliases
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix) {
    try {
      // Find all playlists owned by the user
      const userPlaylists = await Playlist.find({ owner: message.author.id });

      if (userPlaylists.length === 0) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`You haven't created any playlists yet.`)],
        });
      }

      const playlistList = userPlaylists
        .map((playlist, index) => `${index + 1}. **${playlist.name}** (${playlist.songs.length} tracks)`)
        .join('\n');

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Your playlists:\n${playlistList}`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = ListPlaylists;
