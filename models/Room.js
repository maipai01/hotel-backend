const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hotel_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : Hotels,
        required: [true]
    },
    room_number : {
        type: String,
        required: [true, 'Please add a room number']
    },
    room_type : {
        type: String
    },
    room_size : {
        type: Number,
        required: [true, 'Please add a room size']
    },
    price_per_night: {
        type: Number,
        required: [true, 'Please add the price per night']
    },
    features: [{
        type: mongoose.Schema.ObjectId,
        ref: Features
    }]
});