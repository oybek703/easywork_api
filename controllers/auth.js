exports.postLogin = (req, res) => {
    const {username, phone} = req.body

    res.json({msg: 'login'})
}