const express = require('express');
const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

const app = express();

const {getAllHotel, getOneHotel, createHotel, updateHotel, deleteHotel} = require('../controllers/hotels');

router.route('/').get(getAllHotel).post(protect, authorize('admin'), createHotel);
router.route('/:id').get(getOneHotel).put(protect, authorize('admin'), updateHotel).delete(protect, authorize('admin'), deleteHotel);

module.exports = router;