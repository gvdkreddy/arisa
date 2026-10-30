const Avon = require("./structures/Arisa_Client.js");
const client = new Avon();
module.exports = client;

const mongoose = require("mongoose");
const { Database } = require("quickmongo");
client.db = new Database("mongodb+srv://");
const dbOptions ={ useNewUrlParser:true, autoIndex:false, useUnifiedTopology:true }
mongoose.connect('mongodb+srv://',dbOptions)
mongoose.connection.on("connected",()=>{
 console.log("Kronix | Mongoose connected")
})

const config = require("../config.json");
const { AutoPoster } = require("topgg-autoposter");
const autoposter = AutoPoster(config.topggapi, client);
autoposter.on("posted", (stats) => { console.log(`Posted Stats to TopGG`); })
