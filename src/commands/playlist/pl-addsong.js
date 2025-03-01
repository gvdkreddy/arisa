const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class AddToPlaylist extends AvonCommand {
  get name() {
    return 'pl-addsong'; // Command name
  }

  get aliases() {
    return ['pl-addtrack']; // Command aliases
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

      // Get the currently playing track from your music player. Modify this based on your actual implementation.
      const currentlyPlayingTrack = player.queue.current;

      // Check if there is a track currently playing
      if (!currentlyPlayingTrack) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`No track is currently playing.`)] });
      }

      // Check if the user provided a playlist name
      const playlistName = args.join(' ');

      if (!playlistName) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide the name of the playlist to save the currently playing track to.**`)] });
      }

      // Find the playlist with the provided name and owned by the user
      const playlist = await Playlist.findOne({ name: playlistName, owner: message.author.id });

      if (!playlist) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` not found or you don't have permission to modify it.`)],
        });
      }

      // Add the currently playing track to the playlist
      playlist.songs.push({ title: currentlyPlayingTrack.title, url: currentlyPlayingTrack.url });
      await playlist.save();

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Currently playing track added to playlist \`${playlistName}\`.`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = AddToPlaylist;
