import {
    ADD_CONTACT, 
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACT,
    CLEAR_CONTACT,
    SET_LOADING,
} from '../types'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contacts: action.payload,
                loading: false,
            }
        case ADD_CONTACT: 
            return {
                ...state,
                contacts:[...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts:state.contacts.filter(contact => contact._id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                currentContact:action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                currentContact:null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts:state.contacts.map(
                    contact => contact._id === action.payload._id? action.payload : contact
                )
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filtered:  state.contacts.filter( contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: []
            }
        case SET_LOADING:
            return {
                ...state,
                loading:action.payload
            }
        default:
            return state
    }
}