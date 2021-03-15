const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
exports.postLogin = async (req, res, next) => {
    try {
        const {name, phone, role} = req.body
        const user = await User.create({name, phone, role})
        console.log(user)
        res.json({success: true, msg: 'login'})
    } catch (e) {
        next(new ErrorResponse(`User creation failed.`, 400))
    }
}