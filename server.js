const express = require('express')
const connectDB = require('./config/db')
const app = express()
const path = require('path')

// Connect Database
connectDB()

// Init Middleware - Allows us to get data from req.body
app.use(express.json({ extended: false }))

// app.get('/', (req, res) => res.send('API is Running!!!'))

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`🏃‍♂️ 🏃‍♂️ 🏃‍♂️ Server running on port ${port}`))