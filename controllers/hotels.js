const Hotel = require('../models/Hotels');
// @desc    Get all hotels
// @route   GET /api/v1/hotels
// @access  Public
exports.getAllHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({ success: true, count: hotels.length, data: hotels });
    }
    catch (err) {
        res.status(400).json({success: false});
    }
};

// @desc    Get single hotel
// @route   GET /api/v1/hotels/:id
// @access  Public
exports.getOneHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(400).json({success: false});
        }
        res.status(200).json({ success: true, data: hotel});
    }
    catch (err) {
        res.status(400).json({success: false});
    }
};

// @desc    Create new hotel
// @route   POST /api/v1/hotels
// @access  Private
exports.createHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json({ success: true, data: hotel });
    } catch (err) {
        let errorMessage = "Server error";

        // Handle Mongoose validation errors
        if (err.name === "ValidationError") {
            errorMessage = Object.values(err.errors).map(val => val.message).join(", ");
        }
        
        res.status(400).json({ success: false, error: errorMessage });
    }
};

// @desc    Update hotel
// @route   PUT /api/v1/hotels/:id
// @access  Private
exports.updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!hotel) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({ success: true, data: hotel });
    }
    catch (err) {
        res.status(400).json({success: false});
    }
};

// @desc    Delete hotel
// @route   DELETE /api/v1/hotel/:id
// @access  Private
exports.deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!hotel) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({ success: true, data: {}});
    }
    catch (err) {
        res.status(400).json({success: false});
    }
};