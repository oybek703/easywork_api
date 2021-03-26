const express = require('express')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const connectDB = require('./db')

const app = express()
if(process.env.NODE_ENV !== 'production') {require('dotenv').config()}
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'"],
        }
    }
}))
app.use(xss())
app.use(hpp())
app.use(cors())
app.use(rateLimit({
    windowsMs: 10 * 60 * 1000, // 10 minutes
    max: 100
}))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(mongoSanitize())
app.use('/auth', require('./routes/auth'))
app.use(require('./middleware/error'))
app.use(require('./middleware/notFound'))

const PORT = process.env.PORT || 5000
connectDB().then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}...`)))
