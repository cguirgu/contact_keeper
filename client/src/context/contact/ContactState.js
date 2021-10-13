import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types'
import contactContext from './contactContext'

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 2,
				name: 'Sara Watson',
				email: 'sara@gmail.com',
				phone: '222-222-2222',
				type: 'professional',
			},
			{
				id: 2,
				name: 'Tina G',
				email: 'cguirgu@gmail.com',
				phone: '222-222-2222',
				type: 'personal',
			},
		],
	}

	const [state, dispatch] = useReducer(contactReducer, initialState)

	// Add Contact

	// Delete Contact

	// Set Current Contact

	// Clear Current Contact

	// Update Contact

	// Filter Contacts

	// Clear Filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
