const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const DeviceData = require('./models/DeviceData');
const Alerts = require('./models/Alert');
const mqttClient = require('./mqtt'); // Import the MQTT setup

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB connected ${MONGODB_URI}`))
    .catch(err => console.error('MongoDB connection error:', err));

// Define API routes
app.get('/api/devicedata', async (req, res) => {
    try {
        const data = await DeviceData.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/alerts', async (req, res) => {
    try {
        const data = await Alerts.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
