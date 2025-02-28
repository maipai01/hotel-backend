const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        unique: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        unique: true
    },
    telephoneNumber: {
        type: String,
        required: [true, 'Please add a telephone number'],
        unique: true,
        match : [
            /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/,
            'Please add a valid phone number'
        ]
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Reverse populate with virtuals
HotelSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'hotel',
    justOne: false
});

module.exports = mongoose.model('Hotel', HotelSchema);