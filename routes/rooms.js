const express = require('express');
const router = express.Router({mergeParams: true});

const {getRooms} = require('../controllers/rooms');

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getRooms);

module.exports = router;