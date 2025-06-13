//backend/models/Nominee.js
const mongoose = require("mongoose");

const NomineeSchema = new mongoose.Schema({
    dancer: String,
    dj: String,
    influencer: String,
    photographer: String,
});

module.exports = mongoose.model("Nominee", NomineeSchema);