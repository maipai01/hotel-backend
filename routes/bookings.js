const express = require('express');
const router = express.Router({mergeParams : true});

const {getBookings} = require('../controllers/bookings');

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getBookings);