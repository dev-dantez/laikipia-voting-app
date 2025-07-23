const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");

// GET /votes (for browser test)
router.get("/", (req, res) => {
    res.status(200).json({ message: "Votes endpoint is working. Use POST to submit votes." });
});

// POST /votes
router.post('/', async (req, res) => {
    try {
        const { dancer, dj, influencer, photographer } = req.body;

        const vote = new Vote({ dancer, dj, influencer, photographer });
        await vote.save();

        res.status(201).json({ message: "Vote submitted successfully" });
    } catch (error) {
        console.error("Error Saving Vote:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;

