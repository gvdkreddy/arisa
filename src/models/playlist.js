const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure each playlist has a unique name
  },
  owner: {
    type: String, // You can change the type to match your user identifier (e.g., Discord user ID)
    required: true,
  },
  songs: [
    {
      title: String, // Song title
      url: String,   // Song URL or identifier
    },
  ],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
