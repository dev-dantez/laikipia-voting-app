const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const voteRoutes = require('./routes/VoteRoutes');

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// -------------------------------------
// ✅ CORS Configuration (fixes frontend issues)
const allowedOrigins = [
  'https://laikipia-voting.netlify.app/', // real frontend domain
 // 'http://localhost:3000'                   // For local testing
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`❌ CORS blocked: ${origin}`));
  }
}));

// -------------------------------------

// Middleware
app.use(express.json());

// Base route – sanity check
app.get('/', (req, res) => {
  res.send('🚀 Laikipia Voting API is live!');
});

// Vote API routes
app.use('/votes', voteRoutes);

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

console.log('🧪 Loaded Mongo URI:', mongoURI); // Don’t expose full URI in prod

// Mongoose DB connection
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`🌍 Live on: https://laikipia-voting-api.onrender.com/votes`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
