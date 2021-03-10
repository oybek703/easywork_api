const {Router} = require('express')
const {postLogin} = require('../controllers/auth')

const router = Router()

router.route('/login')
    .post(postLogin)

module.exports = router