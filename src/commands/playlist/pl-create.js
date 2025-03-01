// Import necessary libraries and modules
const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class CreatePlaylist extends AvonCommand {
  get name() {
    return 'pl-create'; // Command name
  }

  get aliases() {
    return ['createpl', 'newplaylist']; // Command aliases
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix) {
    try {
      // Check if the user provided a playlist name
      const playlistName = args.join(' ');

      if (!playlistName) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide a name for your playlist**`)] });
      }

      // Create a new playlist document and save it to the database
      const newPlaylist = new Playlist({
        name: playlistName,
        owner: message.author.id,
        songs: [], // You can initialize an empty array of songs
      });

      await newPlaylist.save();

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` created successfully.`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = CreatePlaylist;
