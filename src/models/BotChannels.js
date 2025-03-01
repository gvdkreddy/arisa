const mongoose = require('mongoose');

const botChannelsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    botChannels: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('BotChannels', botChannelsSchema);
