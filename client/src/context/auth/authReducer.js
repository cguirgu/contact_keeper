import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types'

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case LOGIN_SUCCESS: // login and register have the same effect
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token) //put token we get back inside of local storage
			return {
				...state,
				...action.payload, // will put the token in state
				isAuthenticated: true,
				loading: false,
			}
		case LOGIN_FAIL: // login error, auth error, logout, and register fail all have same effect
		case AUTH_ERROR:
		case REGISTER_FAIL:
		case LOGOUT:
			localStorage.removeItem('token') //removes the token
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload, //setting it to the error message we set the payload to
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			return state
	}
}
