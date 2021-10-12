const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')

// @route    GET api/contacts
// @desc     Get all user's contacts
// @access   Private (since yu have to be logged in to get them)
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		}) // -1 makes it the most recent contacts first
		res.json(contacts)
	} catch (error) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post(
	'/',
	[auth, [check('name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, phone, type } = req.body

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			})

			const contact = await newContact.save()

			res.json(contact)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server error')
		}
	}
)

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', (req, res) => {
	res.send('Update contact')
})

// @route    PUT api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', (req, res) => {
	res.send('Delete contact')
})

module.exports = router
