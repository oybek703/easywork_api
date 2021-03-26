const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/User')

// @desc Register new user
// @route POST /auth/register
// @access public
exports.register = asyncHandler(async (req, res) => {
        const {username, email, password, role, description} = req.body
        const user = await User.create({email, password, role, description, username})
        sendTokenResponse(user, 200, res)
})


// @desc Login existing user
// @route POST /auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
        const {email, password} = req.body
        const user = await User.findOne({email}).select('+password')
        if(!user) {
            return next(new ErrorResponse('Invalid email address.', 401))
        }
        const isPasswordValid = await user.isValidPassword(password)
        if(!isPasswordValid) {
                return next(new ErrorResponse('Invalid credentials.', 401))
        }
        console.log(res)
        sendTokenResponse(user, 200, res)
})

// get token, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
        const token = user.getToken()
        res.status(statusCode).cookie(
            'token',
            token,
            {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 86400 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
        ).json({success: true, token})
}

// @desc Get current user
// @route GET /auth/login
// @access private
exports.getMe = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)
        res.status(200).json({success: true, user})
})

// @desc Logout user // clear cookie
// @route GET /auth/logout
// @access public
exports.logout = asyncHandler(async (req, res) => {
        res.cookie('token', 'none', {
                expiresIn: new Date(Date.now() + 5 * 1000),
                httpOnly: true
        }).json({success: true, data: {}})
})

