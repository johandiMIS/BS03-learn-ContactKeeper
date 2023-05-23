import React, { useContext, useEffect, useState } from 'react'
import ContactContext from '../../context/contact/contactContext'
// import PropTypes from 'prop-types'

const ContactForm = () => {

    const contactContext = useContext(ContactContext)
    const {contacts, currentContact, addContact, updateContact, clearCurrent, setCurrent} = contactContext

    useEffect(()=>{
        if( currentContact !== null){
            setContact(currentContact)
        }
        else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal',
            })
        }
    }, [currentContact, contacts])

    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal',
    })

    const {name, email, phone, type} = contact

    const onChange = e => {
        setContact({...contact, [e.target.name]:e.target.value})
    }
    const onSubmit = e => {
        e.preventDefault()
        if (currentContact) updateContact(contact)
        else addContact(contact)

        setCurrent(null)
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personal',
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'> {currentContact? "Edit Contact":"Add Contact"}</h2>
            <input 
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input 
                type='text'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input 
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input 
                type='radio'
                name='type'
                value="personal"
                checked={type === "personal"}
                onChange={onChange}
            /> Personal {' '}
            <input 
                type='radio'
                name='type'
                value="professional"
                checked={type === "professional"}
                onChange={onChange}
            /> Professional
            <div>
                <input type='submit' value={currentContact?"Edit Contact":"Add Contact"} className='btn btn-primary btn-block'/>
            </div>
            {currentContact && <div>
                <button className='btn btn-light btn-block' onClick={()=>{clearCurrent()}}> Clear </button>    
            </div>}
        </form>
    )
}

// ContactForm.propTypes = {}

export default ContactForm