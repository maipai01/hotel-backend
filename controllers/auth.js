const User = require('../models/User');

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req,res,next) => {
    try {

        const {name, telephoneNumber, email, password} = req.body;
        
        //Create User
        const user = await User.create({
            name, 
            telephoneNumber, 
            email, 
            password
        });

        //Create token
        sendTokenResponse(user, 200, res);
    }
    catch (err) {
        console.log(err);

        res.status(400).json({
            success: false,
            message : err.message || 'Something went wrong'
        });
        
    }
}

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req,res,next) => {
    try {
        const {email, password} = req.body;

        //Validate email & Password
        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : 'Please provide an email and password'
            });
        }

        //Check for user
        const user = await User.findOne({email}).select('+password');

        if(!user) {
            return res.status(400).json({
                success : false,
                message : 'Invalid Credentials'
            });
        }

        //Check if password matches
        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(400).json({
                success : false,
                message : 'Invalid Credentials'
            });
        }

        //Create token
        sendTokenResponse(user, 200, res);
    }
    catch (err) {
        return res.status(401).json({message: 'Cannot convert email or password to string'})
    }
}
//@desc     promote user to admin
//@route    GET /api/v1/auth/promoteUser
//@access   Public
exports.promoteUser = async (req, res, next) => {
    try {
        
        const user = await User.findByIdAndUpdate(req.params.UserId, {role:'admin'}, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'User promoted to Admin' 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};
const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 *1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    });
}

//@desc     Get current Logged in user
//@route    GET /api/v1/auth/me
//@access   Private
exports.getMe = async (req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
};
//@desc     Get all users
//@route    GET /api/v1/auth/users
//@access   Private/Admin
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Fetch all users from the database

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

//@desc     Logout User / Clear Cookie
//@route    GET /api/v1/auth/logout
//@access   Public
exports.logout = async(req,res,next) => {
    res.cookie('token','none',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
}