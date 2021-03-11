const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/User')
exports.postLogin = asyncHandler(async (req, res, next) => {
    const {name, phone, role} = req.body
    const user = await User.create({name, phone, role})
    console.log(user)
    res.json({success: true, msg: 'login'})
})