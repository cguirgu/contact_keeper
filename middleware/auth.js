const jwt = require('jsonwebtoken')
const config = require('config')

// middleware function (anytime we need to protect a route, we bring in this middleware
// (pass it in as a second paramater in the request))
module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token')

	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}

	try {
		// verifies then places the paylaod into decoded
		const decoded = jwt.verify(token, config.get('jwtSecret'))

		// assign that user to the request object
		req.user = decoded.user

		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
