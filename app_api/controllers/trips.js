const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    const q = await Model.find({}).exec();

    if (!q || q.length === 0) {
        return res.status(404).json({ error: "No trips found" });
    } else {
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model.findOne({ 'code': req.params.tripCode }).exec();

    if (!q) {
        return res.status(404).json({ error: "Trip not found" });
    } else {
        return res.status(200).json(q);
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: new Date(req.body.start.trim()), // Ensure proper Date conversion
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();
        return res.status(201).json(q);
    } catch (err) {
        return res.status(400).json({ error: "Failed to add trip", details: err });
    }
};

// ✅ PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async (req, res) => {
    try {
        // Debugging logs
        console.log("Updating Trip:", req.params);
        console.log("Data Received:", req.body);

        const q = await Model.findOneAndUpdate(
            { code: req.params.tripCode }, // Find trip by tripCode
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: new Date(req.body.start.trim()), // Ensure date is properly formatted
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } // Return the updated document
        ).exec();

        if (!q) {
            return res.status(400).json({ error: "Trip not found or update failed" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(400).json({ error: "Failed to update trip", details: err });
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip  
};
