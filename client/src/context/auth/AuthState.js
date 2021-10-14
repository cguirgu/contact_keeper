import React, { useReducer } from 'react'
import AuthContext from './authContext'
import axios from 'axios'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
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

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'), //looks in browser's local storage
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	}

	const [state, dispatch] = useReducer(authReducer, initialState)

	// Load User
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}

		try {
			const res = await axios.get('/api/auth')
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		} catch (error) {
			dispatch({
				type: AUTH_ERROR,
			})
		}
	}
	// Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		try {
			const res = await axios.post('/api/users', formData, config) // we dont have to enter localhost because we added that proxy
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data, // res.data will be the token
			})

			// once the user is registered, we need to load the user
			loadUser()
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg, //put error message we made in backend in the payload
			})
		}
	}

	// Login User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		try {
			const res = await axios.post('/api/auth', formData, config) // we dont have to enter localhost because we added that proxy
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data, // res.data will be the token
			})

			// once the user is registered, we need to load the user
			loadUser()
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg, //put error message we made in backend in the payload
			})
		}
	}

	// Logout User
	const logout = () => dispatch({ type: LOGOUT })

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				user: state.user,
				clearErrors,
				register,
				loadUser,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
