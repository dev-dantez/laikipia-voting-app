const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const voteRoutes = require('./routes/VoteRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Base route – for Render health check or sanity ping
app.get('/', (req, res) => {
  res.send('🚀 Laikipia Voting API is live!');
});

// Vote API routes
app.use('/votes', voteRoutes);

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Log the loaded URI (ensure no sensitive credentials are exposed in production)
console.log('Loaded URI:', mongoURI);

// Mongoose connection
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`🌍 Live on: https://laikipia-voting-api.onrender.com`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
