const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { expressjwt: jwtMiddleware } = require("express-jwt");

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips'); 

if (!authController || !tripsController) {
    process.exit(1);
}

const auth = jwtMiddleware({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: "user",
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            return req.headers.authorization.split(' ')[1]; 
        }
        return null;
    }
});

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
router.post('/trips', auth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', auth, tripsController.tripsUpdateTrip);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
