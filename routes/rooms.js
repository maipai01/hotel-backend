const express = require('express');

const {getAllRooms, getOneRoom, createRoom, updateRoom, deleteRoom} = require('../controllers/rooms');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getAllRooms)
    .post(protect, authorize('admin'), createRoom);
router.route('/:id')
    .get(protect, getOneRoom)
    .put(protect, authorize('admin'), updateRoom)
    .delete(protect, authorize('admin'), deleteRoom);

module.exports = router;