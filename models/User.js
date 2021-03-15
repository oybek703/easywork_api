const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [4, 'Username must have at least 4 characters.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password must contain at least 6 characters']
    },
    role: {
        type: String,
        enum: ['user', 'employer'],
        default: 'user'
    },
    description: {
        type: String,
        validate: {
            validator: () => {
                return this.role
            },
            message: 'Description should have at least 10 characters.'
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)