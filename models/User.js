const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [4, 'Username must have at least 4 characters.']
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address.',
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password must contain at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'employer'],
        default: 'user'
    },
    description: {
        type: String
    },
    subjects: {
        type: Array,
        default: []
    }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    if(this.role === 'employer') {
        if(this.description.length < 5) {
            throw new  Error('Description is must contain at least 5 characters.')
        }
    } else {
        this.description = 'simple user...'
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.getToken = function () {
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
        )
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)