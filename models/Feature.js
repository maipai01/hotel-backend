const mongoose = require('mongoose')

const FeatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    extra_cost: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Feature', FeatureSchema); 