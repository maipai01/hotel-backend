const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    room_type_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'RoomType',
        required: true
    },
    room_number: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate room numbers
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'under maintenance'],
        default: 'available'
    }
});

module.exports = mongoose.model('Room', RoomSchema);
