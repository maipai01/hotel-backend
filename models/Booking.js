const mongoose = require('mongoose');

const Hotel = require('./Hotel');

const BookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    hotel : {
        type : mongoose.Schema.ObjectId,
        ref : 'Hotel',
        required : true
    },
    checkIn : {
        type : Date,
        required : true
    },
    checkOut : {
        type : Date,
        required : true,
        validate: {
            validator: function(value) {
                // Check that check-out is after check-in
                return value > this.checkIn;
            },
            message: 'Check-out date must be after check-in date'
        }
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

// Custom validation for booking duration
BookingSchema.pre('save', function(next) {
    const bookingDuration = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24); // duration in days
    if (bookingDuration > 3) {
        return next(new Error('Booking cannot be made for more than 3 nights'));
    }
    next();
});

module.exports = mongoose.model('Booking' , BookingSchema);