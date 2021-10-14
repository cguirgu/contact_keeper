import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route, Redirect } from 'react-router-dom'

// Creates a new route that you can't access unless you are logged in
// the arguments are the standard way of creating a private component in React
const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, loading } = authContext
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

export default PrivateRoute
