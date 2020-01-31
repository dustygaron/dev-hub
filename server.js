const express = require('express')
const connectDB = require('./config/db')
const app = express()

// Connect Database
connectDB()

// Init Middleware - Allows us to get data from req.body
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API is Running!!!'))

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`🏃‍♂️ 🏃‍♂️ 🏃‍♂️ Server running on port ${port}`))