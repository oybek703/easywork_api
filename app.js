require('dotenv').config()
const express = require('express')
const connectDB = require('./db')
const app = express()

app.use(express.json())
app.use('/auth', require('./routes/auth'))
app.use(require('./middleware/error'))
app.use(require('./middleware/notFound'))

const PORT = process.env.PORT || 5000
connectDB().then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}...`)))
