const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

//@desc Get all rooms
//@route GET /api/v1/rooms
//@access Public
exports.getAllRooms = async (req, res, next) => {
    let query;
    //If hotel Id is specified, return all rooms in that hotel
    if (req.params.hotelId) {
      console.log(req.params.hotelId);
      query = Room.find({
        hotel_id: req.params.hotelId
      }).populate({
        path: 'room_type_id', // Populate RoomType (first level)
        populate: {
          path: 'hotel_id', // Populate Hotel (second level)
          model: 'Hotel'
        }
      });
    }
    else { //Else return every room
      query = Room.find().populate({
        path: 'room_type_id', // Populate RoomType (first level)
        populate: {
          path: 'hotel_id', // Populate Hotel (second level)
          model: 'Hotel'
        }
      });
    }

    try {
      const rooms = await query;

      res.status(200).json({
          success: true,
          count: rooms.length,
          data: rooms
      });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Cannot find any rooms"});
    }
};

//@desc     Get one room
//@route    GET /api/v1/rooms/:id
//@access   Public
exports.getOneRoom = async (req,res,next) => {
  try {
      const room = await Room.findById(req.params.id).populate({
        path: 'room_type_id', // Populate RoomType (first level)
        populate: {
          path: 'hotel_id', // Populate Hotel (second level)
          model: 'Hotel'
        }
      });

      if (!room) {
          return res.status(404).json({success: false, message: `No room with the id of ${req.params.id}`});
      }

      res.status(200).json({success: true, data: room});

  }
  catch (err) {
      console.log(err);
      return res.status(500).json({success: false, message: "Cannot find room"});
  }
};

// @desc    Create new room
// @route   POST /api/v1/rooms
// @access  Private
exports.createRoom = async (req, res, next) => {
  try {
      const room = await Room.create(req.body);
      res.status(201).json({ success: true, data: room });
  } catch (err) {
      let errorMessage = "Server error";

      // Handle Mongoose validation errors
      if (err.name === "ValidationError") {
          errorMessage = Object.values(err.errors).map(val => val.message).join(", ");
      }
      
      res.status(400).json({ success: false, error: errorMessage });
  }
};

// @desc    Update room
// @route   PUT /api/v1/rooms/:id
// @access  Private
exports.updateRoom = async (req, res, next) => {
  try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
      });

      if (!room) {
          return res.status(400).json({success: false});
      }

      res.status(200).json({ success: true, data: room });
  }
  catch (err) {
      res.status(400).json({success: false});
  }
};

// @desc    Delete room
// @route   DELETE /api/v1/rooms/:id
// @access  Private
exports.deleteRoom = async (req, res, next) => {
  try {
      const room = await Hotel.findById(req.params.id);
      
      if (!room) {
          return res.status(404).json({success: false, 
              message: `Room not found with id of ${req.params.id}`});
      }

      res.status(200).json({ success: true, data: {}});
  }
  catch (err) {
      res.status(400).json({success: false});
  }
};