const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const voteRoutes = require('./routes/VoteRoutes');

dotenv.config();

const app = express();

// ✅ CORRECT CORS config (no trailing slash)
const allowedOrigins = [
  'https://laikipia-voting.netlify.app',
  'http://localhost:3000' // optional local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`❌ CORS blocked: ${origin}`));
  }
}));

app.use(express.json());

// Sanity route
app.get('/', (req, res) => {
  res.send('🚀 Laikipia Voting API is live!');
});

// Routes
app.use('/votes', voteRoutes);

const mongoURI = process.env.MONGO_URI;
console.log('🧪 Loaded Mongo URI:', mongoURI); // Do NOT show in prod

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌍 Live at: https://laikipia-voting-api.onrender.com/votes`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
