const mongoose = require('mongoose');
const Trip = require('../models/travlr'); 
const User = require('../models/user');




const getUser = async (req, res, callback) => {
    if (req.user && req.user.email) {
        try {
            const user = await User.findOne({ email: req.user.email }).exec();
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            callback(req, res, user);
        } catch (err) {
            return res.status(500).json({ error: "Database error" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized access" });
    }
};



const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips || trips.length === 0) {
            return res.status(404).json({ error: "No trips found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ error: "Error retrieving trips" });
    }
};



const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode.trim() }).exec();
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ error: "Error retrieving trip" });
    }
};


const tripsAddTrip = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const newTrip = new Trip({
            code: req.body.code.trim(),
            name: req.body.name.trim(),
            length: req.body.length.trim(),
            start: new Date(req.body.start.trim()), 
            resort: req.body.resort.trim(),
            perPerson: req.body.perPerson,
            image: req.body.image.trim(),
            description: req.body.description.trim()
        });

        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);
    } catch (err) {
        return res.status(400).json({ error: "Failed to add trip" });
    }
};




const tripsUpdateTrip = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode.trim() },
            {
                code: req.body.code.trim(),
                name: req.body.name.trim(),
                length: req.body.length.trim(),
                start: new Date(req.body.start.trim()), 
                resort: req.body.resort.trim(),
                perPerson: req.body.perPerson,
                image: req.body.image.trim(),
                description: req.body.description.trim()
            },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        return res.status(500).json({ error: "Failed to update trip" });
    }
};



module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
