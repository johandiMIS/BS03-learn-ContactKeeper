import React, {useReducer} from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
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
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [],
        currentContact: null,
        filtered: null,
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // add contact
    const addContact = async contact => {
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post('/api/contact', contact, config)
            dispatch({type: ADD_CONTACT, payload: res.data})
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg})
        }
    }
    // get contact
    const getContact = async ()=>{
        try{
            const res = await axios.get('/api/contact')
            dispatch({type: GET_CONTACT, payload: res.data})
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg})
        }
    }
    // delete contact
    const deleteContact = async id => {
        try{
            await axios.delete(`/api/contact/${id}`)
            dispatch({type: DELETE_CONTACT, payload:id})
        }catch(err){
            dispatch({type: CONTACT_ERROR, payload:err.response.msg})
        }
    }
    // set current contact
    const setCurrent = contact => {

        dispatch({type: SET_CURRENT, payload:contact})
    }
    // clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }
    // update contact
    const updateContact = async contact => {
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.put(`/api/contact/${contact._id}`, contact, config)
            dispatch({type: UPDATE_CONTACT, payload:res.data})
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg})
        }
    }
    // filter contact
    const filterContact = text => {
        dispatch({type: FILTER_CONTACT, payload:text})
    }
    // clear filter 
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }
    return (
        <ContactContext.Provider value={{
            contacts:state.contacts,
            currentContact:state.currentContact,
            error: state.error,
            filtered:state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContact,
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState