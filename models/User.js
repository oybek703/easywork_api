const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [4, 'Username must have at least 4 characters.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        validate: {
            validator: v => {
                return /^\+[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/.test(v)
            },
            message: `Phone number is not valid.`
        }
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