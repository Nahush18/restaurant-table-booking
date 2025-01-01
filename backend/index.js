const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Schema and Model
const ReservationSchema = new mongoose.Schema({
    date: String,
    time: String,
    guests: Number,
    name: String,
    contact: String,
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

// Routes
app.post('/api/reserve', async (req, res) => {
    const { date, time, guests, name, contact } = req.body;

    // Check for double booking
    const existingReservation = await Reservation.findOne({ date, time });
    if (existingReservation) {
        return res.status(400).json({ message: 'Time slot already booked!' });
    }

    const reservation = new Reservation({ date, time, guests, name, contact });
    await reservation.save();
    res.status(201).json({ message: 'Reservation successful!' });
});

app.get('/api/availability', async (req, res) => {
    const { date } = req.query;
    const reservations = await Reservation.find({ date });
    res.status(200).json(reservations);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
