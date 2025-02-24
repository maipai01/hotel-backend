const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

//@desc Get all rooms
//@route GET /api/v1/rooms
//@access Public
exports.getRooms = async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    console.log(reqQuery);

  try {
    const rooms = await Room.find();
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};