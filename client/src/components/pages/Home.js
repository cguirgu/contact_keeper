import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
	const authContext = useContext(AuthContext)

	// Added this because after we registered and were redirected to the dashboard/home page,
	// when we refreshed the page, the user would be un-loaded and not authenticated,
	// so we needed to add useEffect here to make sure that everytime we reloaded the page (hence the empty brackets),
	// the user would be loaded
	useEffect(() => {
		authContext.loadUser()
		// eslint-disable-next-line
	}, [])
	return (
		<div className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts />
			</div>
		</div>
	)
}

export default Home
