const { EmbedBuilder } = require("discord.js");
const AvonCommand = require(`../../structures/avonCommand`);
const Playlist = require('../../models/playlist'); // Import your Mongoose Playlist model

class PlayPlaylist extends AvonCommand {
  get name() {
    return 'pl-load'; // Command name
  }

  get aliases() {
    return ['pl-play', 'loadplaylist']; // Command aliases
  }

  get cat() {
    return 'playlist'; // Category
  }

  async run(client, message, args, prefix) {
      let channel = message.member.voice.channel;
            var player = client.poru.players.get(message.guild.id);
            if(!player){
                player = await client.poru.createPlayer({
                    guildId : message.guild.id,
                    voiceId : channel.id,
                    textId : message.channel.id,
                    deaf : true,
                    volume : 100,
                    shardId : message.guild.shardId
                });
            }
    try {
      // Check if the user is in a voice channel
      if (!message.member.voice.channel) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`You need to be in a voice channel to use this command.`)] });
      }

      // Check if the user provided a playlist name
      const playlistName = args.join(' ');

      if (!playlistName) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`**Provide the name of the playlist to play.**`) ]});
      }

      // Find the playlist with the provided name and owned by the user
      const playlist = await Playlist.findOne({ name: playlistName, owner: message.author.id });

      if (!playlist) {
        return message.channel.send({
          embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` not found or you don't have permission to play it.`)],
        });
      }
        
      // Play the playlist
      for (const track of playlist.songs) {
        try {
            const query = track.title
          player.setTextChannel(message.channel.id);
           let result = await player.search(query , {requester : message.author});
          if (result.tracks.length > 0) {
              player.queue.add(result.tracks[0]);
              if(!player.playing && !player.paused) 
                  player.play();
          }
        } catch (e) {
          console.error(e);
        }
      }

      return message.channel.send({
        embeds: [new EmbedBuilder().setColor(client.config.color).setDescription(`Playlist \`${playlistName}\` is now playing.`)],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = PlayPlaylist;
