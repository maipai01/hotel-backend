//This schema is used to store the type of room in a hotel.

const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    room_type: {
        type: String
    },
    room_size: {
        type: Number,
        required: [true, 'Please add a room size']
    },
    price_per_night: {
        type: Number,
        required: [true, 'Please add the price per night']
    },
    features: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Feature'
    }]
});

module.exports = mongoose.model('Room', RoomSchema);

