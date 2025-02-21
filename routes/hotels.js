const express = require('express');
const router = express.Router();

//const {protect, authorize} = require('../middleware/auth');

const app = express();

const {getAllHotel, getOneHotel, createHotel, updateHotel, deleteHotel} = require('../controllers/hotels');

router.route('/').get(getAllHotel).post(createHotel);
router.route('/:id').get(getOneHotel).put(updateHotel).delete(deleteHotel);

module.exports = router;