const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post(
	'/',
	[
		check('name', 'Please add name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body
		try {
			// User model; mongoose method to find a user by any field (in this case email)
			let user = await User.findOne({ email: email })
			// if that user already exists, send 400 status
			if (user) {
				return res.status(400).json({ msg: 'User already exists' })
			}
			// else: create a new User
			user = new User({
				name,
				email,
				password,
			})
			// need a salt to encrypt the password; genSalt returns a promise
			const salt = await bcrypt.genSalt(10)

			// take the plain text password and hash it using the salt and becrypt hash
			user.password = await bcrypt.hash(password, salt)

			// save the user to the database
			await user.save()

			// the object we want to send in the JWT token
			const payload = {
				user: {
					id: user.id,
				},
			}

			//payload, then the secret stored in default.json (config package)
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000, //use 3600 in production (1 hour)
				},
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
