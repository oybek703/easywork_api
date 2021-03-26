module.exports = (req, res) => {
    res.status(404).json({success: false, msg: 'route not found'})
}