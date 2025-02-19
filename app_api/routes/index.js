const express = require('express'); // Express app
const router = express.Router();    // Router logic

// Import the trips controller
const tripsController = require('../controllers/trips');

// Define route for trips
router
    .route('/trips')
    .get(tripsController.tripsList)  
    .post(tripsController.tripsAddTrip); 
// GET and PUT methods for specific trip by tripCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)  
    .put(tripsController.tripsUpdateTrip); 

module.exports = router;
