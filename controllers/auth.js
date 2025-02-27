const User = require('../models/User');
const hrs_to_ms_multiplier = 24*60*60*1000;
//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req,res,next) => {
    try {
        const {name, tel, email, password, role} = req.body;
        
        //Create User
        const user = await User.create({
            name, tel, email, password, role
        });

        //Create token
        sendTokenResponse(user, 200, res);
    }
    catch (err) {
        res.status(400).json({success: false});
        console.log(err.stack);
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

const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * hrs_to_ms_multiplier),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        token
    })
}

//@desc     Get current Logged in user
//@route    POST /api/v1/auth/me
//@access   Private
exports.getMe = async (req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
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