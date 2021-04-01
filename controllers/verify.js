if(process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/User')
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// @desc Verify user by phone number
// @route GET /verify
// @access protected
exports.getToVerification = asyncHandler(async (req, res) => {
    await twilio.verify.services(process.env.EASYWORK_VERIFICATION_SID)
        .verifications.create({to: req.user.phoneNumber, channel: 'sms'})
    res.status(200).json({success: true, msg: 'verification code sent successfully. Verification status: pending'})
})

// @desc Verify user by phone number
// @route POST /verify
// @access protected
exports.checkVerification = asyncHandler(async (req, res, next) => {
    const {verificationCode: code} = req.body
    const {phoneNumber} = req.user
    const verificationResult = await twilio.verify.services(process.env.EASYWORK_VERIFICATION_SID)
        .verificationChecks.create({code, to: phoneNumber})
    if(verificationResult.status === 'approved') {
        await User.findByIdAndUpdate(req.user, {verified: true})
        res.status(200).json({success: true, msg: 'Phone number successfully verified.'})
    } else {
        next(new ErrorResponse(`Invalid verification code: ${code}`, 400))
    }
})
