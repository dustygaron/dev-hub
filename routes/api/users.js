const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// ---------------------
// @route   POST api/users
// @desc    Register user
// @route   Public
// ---------------------
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
],
  async (req, res) => {
    // console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body


    // Encrypt password
    // Return jsonwebtoken
    try {
      // See if user exists
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      // Create new user (pass not encrypted yet)
      user = new User({ name, email, avatar, password })

      // Create salt and encrypt pass
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      // Save user to DB
      await user.save()

      // Return jsonwebtoken
      res.send('User registered')

    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }


    res.send('User route')
  })



module.exports = router