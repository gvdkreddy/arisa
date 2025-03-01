const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class DeletePlaylist extends AvonCommand {
  get name() {
    return 'pl-delete'; // Command name
  }

  get aliases() {
    return ['removeplaylist']; // Command aliases
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix) {
    try {
      // Check if the user provided a playlist name
      const playlistName = args.join(' ');

      if (!playlistName) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide the name of the playlist to delete.**`)] });
      }

      // Find the playlist with the provided name and owned by the user
      const playlist = await Playlist.findOne({ name: playlistName, owner: message.author.id });

      if (!playlist) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` not found or you don't have permission to delete it.`)],
        });
      }

      // Delete the playlist from the database
      await playlist.delete();

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` has been deleted.`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = DeletePlaylist;
