import axios from 'axios'

const setAuthToken = (token) => {
	// set the key we use to hold the token to whatever the token is
	// if the token exists
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

export default setAuthToken
