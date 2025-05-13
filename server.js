const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/appointment-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const Appointment = require('./models/Appointment');

app.get('/api/appointments', async (req, res) => {
    try {
        const cursor = Appointment.find().cursor();
        const appointments = [];
        
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            appointments.push(doc);
        }
        
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/appointments', async (req, res) => {
    const appointment = new Appointment(req.body);
    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.patch('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (appointment) {
            appointment.status = req.body.status;
            const updatedAppointment = await appointment.save();
            res.json(updatedAppointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/appointments/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const cursor = Appointment.find({
            date: {
                $gte: today,
                $lt: tomorrow
            }
        }).cursor();

        const appointments = [];
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            appointments.push(doc);
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 