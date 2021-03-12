const express = require('express')
const connectDB = require('./db')
const app = express()
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
app.use(express.json())
app.use('/auth', require('./routes/auth'))
app.use(require('./middleware/error'))
app.use(require('./middleware/notFound'))

const PORT = process.env.PORT || 5000
connectDB().then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}...`)))
