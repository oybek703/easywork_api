const ErrorResponse = require('../utils/errorResponse')
module.exports = (err, req, res, next) => {
    let error = {...err}
    error.message = err.message
    if(err.code === 11000) {
        error = new ErrorResponse(
            `Field already exists, duplicate field error at: ${JSON.stringify(err.keyPattern)}`,
            409
        )
    }
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(v => v.message)
        error  = new ErrorResponse(message, 400)
    }
    if(err.name === 'CastError') {
        error = new ErrorResponse('Resource not found.', 404)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error.'
    })
}