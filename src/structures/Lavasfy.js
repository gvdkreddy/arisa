const { LavasfyClient } = require("lavasfy");
const config = require(`../../config.json`);
class Lavasfy extends LavasfyClient{
    constructor(client){
        super({
            clientID : config.spotifyId,
            clientSecret : config.spotifySecret,
            playlistLoadLimit : 4,
            audioOnlyResults : true,
            autoResolve : true,
            useSpotifyMetadata : true
        },[
            {
                id : "Avon",
                host : "node.raidenbot.xyz",
                port : 5500,
                password : "pwd",
                secure : false
            }
        ]);
    }
}
module.exports = Lavasfy;