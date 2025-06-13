// VoteRoutes.js
const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote"); // Make sure you have a Vote model

// POST /vote route
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

      