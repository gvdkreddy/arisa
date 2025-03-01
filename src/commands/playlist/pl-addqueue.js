const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class AddQueueToPlaylist extends AvonCommand {
  get name() {
    return 'pl-addqueue'; // Command name
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix, player) {
    try {
      // Check if the user is in a voice channel
      if (!message.member.voice.channel) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`You need to be in a voice channel to use this command.`)] });
      }

      // Get the queue of currently queued tracks from your music player. Modify this based on your actual implementation.
      const queue = player.queue.map((track) => track);

      // Check if there is a queue with tracks
      if (!queue || queue.length === 0) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`The queue is empty.`)] });
      }

      // Check if the user provided a playlist name
      const playlistName = args.join(' ');

      if (!playlistName) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide the name of the playlist to save the queue to.**`)] });
      }

      // Find the playlist with the provided name and owned by the user
      const playlist = await Playlist.findOne({ name: playlistName, owner: message.author.id });

      if (!playlist) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` not found or you don't have permission to modify it.`)],
        });
      }

      // Add the whole queue to the playlist
      queue.forEach((track) => {
        playlist.songs.push({ title: track.title, url: track.url });
      });

      await playlist.save();

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Queue added to playlist \`${playlistName}\`.`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = AddQueueToPlaylist;
