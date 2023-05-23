import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext'

// import PropTypes from 'prop-types'

const ContactFilter = props => {
    const contactContext = useContext(ContactContext)
    const {filterContact, clearFilter, filtered} = contactContext
    const text = useRef('')

    useEffect(()=>{
        if(filtered === null){
            text.current.value = ""
        }
    })

    const onChange = (e) =>{
        if(text.current.value !== ''){
            filterContact(e.target.value)
        } else{
            clearFilter()
        }
    }

    return (
    <form>
        <input ref={text} type='text' placeholder='filter contacts' onChange={onChange}/>
    </form>
  )
}

// ContactFilter.propTypes = {}

export default ContactFilter