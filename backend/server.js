const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const voteRoutes = require('./routes/VoteRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
console.log('Loaded URI:', mongoURI);

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => {
            console.log('Server is running on https://laikipia-voting-api.onrender.com');
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use('/votes', voteRoutes);
