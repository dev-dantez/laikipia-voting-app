// VoteRoutes.js
const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote"); // Ensure your model path is correct

// @route   GET /votes
// @desc    Fetch all votes (for testing or admin purposes)
router.get('/', async (req, res) => {
    try {
        const votes = await Vote.find();
        res.status(200).json(votes);
    } catch (error) {
        console.error("❌ Error fetching votes:", error);
        res.status(500).json({ error: "Failed to retrieve votes" });
    }
});

// @route   POST /votes
// @desc    Submit a vote
router.post('/', async (req, res) => {
    try {
        const { dancer, dj, influencer, photographer } = req.body;

        // Optional: basic validation
        if (!dancer && !dj && !influencer && !photographer) {
            return res.status(400).json({ error: "At least one vote field must be filled." });
        }

        const vote = new Vote({ dancer, dj, influencer, photographer });
        await vote.save();

        res.status(201).json({ message: "✅ Vote submitted successfully" });
    } catch (error) {
        console.error("❌ Error saving vote:", error);
        res.status(500).json({ error: "Something went wrong while submitting your vote" });
    }
});

router.get("/", (req, res) => {
    res.status(200).json({ message: "Votes endpoint is working. Use POST to submit votes." });
});


module.exports = router;
