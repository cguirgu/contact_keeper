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
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body

	// Build contact object
	const contactFields = {}
	if (name) contactFields.name = name
	if (phone) contactFields.phone = phone
	if (email) contactFields.email = email
	if (type) contactFields.type = type

	try {
		let contact = await Contact.findById(req.params.id)

		if (!contact) return res.status(404).json({ msg: 'Contact not found' })

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' })
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields }, // sets the contact to the contact field object we made
			{ new: true } // creates the contact if it doesn't exist
		)

		res.json(contact)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

// @route    PUT api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id)

		if (!contact) return res.status(404).json({ msg: 'Contact not found' })

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' })
		}

		await Contact.findByIdAndRemove(req.params.id)

		res.json({ msg: 'Contact removed' })
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

module.exports = router
