const express = require('express');
const router = express.Router();

// Include other resource routers
const roomRouter = require('./rooms');

const {getAllHotels, getOneHotel, createHotel, updateHotel, deleteHotel} = require('../controllers/hotels');

const {protect, authorize} = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:hotelId/rooms', roomRouter);

router.route('/')
    .get(getAllHotels)
    .post(protect, authorize('admin'), createHotel);
router.route('/:id')
    .get(getOneHotel)
    .put(protect, authorize('admin'), updateHotel)
    .delete(protect, authorize('admin'), deleteHotel);

module.exports = router;