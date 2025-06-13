const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    dancer: { type: String, required: true },
    dj: { type: String, required: true },
    influencer: { type: String, required: true },
    photographer: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vote', voteSchema);