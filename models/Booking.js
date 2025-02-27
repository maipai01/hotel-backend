const mongoose = require('mongoose');

const Hotel = require('./Hotel');

const BookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    hospital : {
        type : mongoose.Schema.ObjectId,
        ref : 'Hospital',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Booking' , BookingSchema);