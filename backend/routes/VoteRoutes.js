const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Votes endpoint is working. Use POST to submit votes." });
});

router.post("/", async (req, res) => {
  try {
    const { dancer, dj, influencer, photographer } = req.body;

    console.log("📨 Received vote:", req.body);

    if (!dancer || !dj || !influencer || !photographer) {
      return res.status(400).json({ message: "All categories must be selected." });
    }

    const vote = new Vote({ dancer, dj, influencer, photographer });
    await vote.save();

    res.status(201).json({ message: "✅ Vote submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving vote:", error);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
});

module.exports = router;
