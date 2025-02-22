const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    phoneNumbers: {
        type: [String],
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length > 0; // Ensures at least one phone number is provided
            },
            message: 'At least one phone number is required.'
        }
    }
})

module.exports = mongoose.model('Hotels', HotelSchema);