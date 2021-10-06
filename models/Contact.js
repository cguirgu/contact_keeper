const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, //when we create an entry with MongoDB, the document has an object id and that is the type this is
		ref: 'users',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	date: {
		type: String,
		default: Date.now,
	},
})

module.exports = mongoose.model('contact', ContactSchema)
