const express = require('express')
const {protect} = require("../middleware/auth")
const {getToVerification, checkVerification} = require('../controllers/verify')
const router = new express.Router()

router.route('/')
    .get(protect, getToVerification)
    .post(protect, checkVerification)

module.exports = router

