exports.postLogin = (req, res, next) => {
    const {username, phoneNumber} = req.body
    console.log(req.body)
    if(!req.body) {
        const error = new Error('Something went wrong!')
        next(error)
    }
    res.json({success: true, msg: 'login'})
}